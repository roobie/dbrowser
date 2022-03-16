import { DataGrid, SortDirection } from "./component.datagrid.ts";
import { LoadingScreen } from "./component.loading-screen.ts";
import { navigate } from "./navigation.ts";
import orderBy from "lodash/orderBy";
import forEach from "lodash/forEach";
import find from "lodash/find";
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
  orderBy: [keyof TableRecord, SortDirection | undefined][];
  filterBy: Record<keyof TableRecord, string | undefined>;
}
function initState(): State {
  return {
    loading: true,
    tables: [],
    orderBy: [
      ["name", "asc"],
    ],
    filterBy: {
      name: void 0,
    },
  };
}

export function TableList() {
  const state: State = initState();

  function loadData() {
    api.get<TableRecord[]>("tables").then(
      (tables) => {
        state.tables = orderBy(
          tables,
          state.orderBy.map(([colName, _]) => colName),
          state.orderBy.map(([_, sortDir]) => sortDir),
        );
        const doFilter = (v: string, k: keyof TableRecord) => {
          v && (state.tables = state.tables.filter((item: TableRecord) => {
            if (item[k].includes(v)) {
              return true;
            }
          }));
        };

        forEach(state.filterBy, doFilter);
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
            sortDir: (function () {
              // const ord = find(state.orderBy, ([k]:[keyof TableRecord]) => k === "name");
              const ord = find(state.orderBy, { 0: "name" });
              const [_, dir] = ord;
              return dir || "asc";
            }()),
            signals: {
              onsort: (dir: SortDirection) => {
                state.orderBy = state.orderBy.filter(([k, _]) => k !== "name")
                  .concat([["name", dir]]);
                loadData();
              },
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
                  state.filterBy.name = e.target.value;
                  loadData();
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
