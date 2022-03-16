import { DataGrid, SortDirection } from "./component.datagrid.ts";
import { LoadingScreen } from "./component.loading-screen.ts";
import { navigate } from "./navigation.ts";
import orderBy from "lodash/orderBy";
import api from "./api.ts";
import m from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { button } = hyperscriptHelper(m);

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
export function TableList() {
  const state: State = initState();

  function loadData(ordering: [string, SortDirection][] = []) {
    if (ordering) {
      for (const [column, dir] of ordering) {
        state.sorting[column] = dir;
      }
    }
    api.get<string[]>("tables").then(
      (tables) => {
        const a = ordering?.map((i) => i[0]);
        const b = ordering?.map((i) => i[1]);
        state.tables = orderBy(tables, a, b);
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
    view(vnode: Vnode<TableListAttrs>) {
      const { attrs } = vnode;
      const grid = m(DataGrid, {
        columns: ["actions", {
          label: "table name",
          sortDir: state.sorting["name"] || "asc",
          signals: {
            onsort: (dir: SortDirection) => loadData([["name", dir]]),
          },
        }],
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
