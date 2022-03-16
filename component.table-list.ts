import { DataGrid, SortDirection } from "./component.datagrid.ts";
import { LoadingScreen } from "./component.loading-screen.ts";
import { navigate } from "./navigation.ts";
import orderBy from "lodash/orderBy";
import api from "./api.ts";
import { TableRecord } from "./api.ts";
import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { button, tr, th, input } = hyperscriptHelper(m);

interface TableListAttrs {
  tables: { name: string }[];
}
interface State {
  loading: boolean;
  tables: { name: string }[];
  sorting: Record<string, SortDirection>;
}
function initState(): State {
  return {
    loading: true,
    tables: [],
    sorting: {},
  };
}
interface DataLoaderParameters {
  substringFilter: [keyof TableRecord, string][];
  orderBy: [keyof TableRecord, SortDirection][];
}
export function TableList() {
  const state: State = initState();

  function loadData(
    parameters: DataLoaderParameters = { substringFilter: [], orderBy: [] },
  ) {
    if (parameters.orderBy) {
      for (const [columnName, dir] of parameters.orderBy) {
        state.sorting[columnName] = dir;
      }
    }
    api.get<TableRecord[]>("tables").then(
      (tables) => {
        state.tables = orderBy(
          tables,
          parameters.orderBy.map(([colName, _]) => colName),
          parameters.orderBy.map(([_, sortDir]) => sortDir),
        );
        if (parameters.substringFilter.length > 0) {
          state.tables = state.tables.filter((item:TableRecord) => {
            for (const [field, term] of parameters.substringFilter) {
              if (item[field].includes(term)) {
                return true;
              }
            }
          });
        }
        state.loading = false;
        m.redraw();
      },
    );
  }

  return {
    oninit(vnode: Vnode<TableListAttrs>) {
      const { attrs } = vnode;
      if (attrs.tables?.length == 0) {
        loadData();
      }
    },
    view() {
      const grid = m(DataGrid, {
        columns: [
          { label: "actions" },
          {
            label: "table name",
            sortDir: state.sorting["name"] || "asc",
            signals: {
              onsort: (dir: SortDirection) =>
                loadData({ substringFilter: [], orderBy: [["name", dir]] }),
            },
          },
        ],
        extraThead: [
          tr([
            th(),
            th(
              input({
                type: "text",
                oninput: (e) => {
                  loadData({substringFilter:[['name', e.target.value]], orderBy:[]})
                },
                placeholder: "search",
              }),
            ),
          ]),
        ],
        records: state.tables.map(renderItem),
      });
      return m(LoadingScreen, { loading: state.loading, element: grid });
    },
  };

  function renderItem(tableMeta: { name: string }) {
    return [
      button({
        onclick: () => {
          navigate({
            table: tableMeta.name,
            view: "view-table",
          });
        },
      }, "Data"),
      tableMeta.name,
    ];
  }
}
