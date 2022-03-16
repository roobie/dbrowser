import { DataGrid } from "./component.datagrid.ts";
import { navigate } from "./navigation.ts";
import api from "./api.ts";
import m from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { button } = hyperscriptHelper(m);

interface TableListAttrs {
  tables: string[];
}
interface State {
  tables: string[];
}
export function TableList() {
  const state: State = {
    tables: [],
  };
  return {
    oninit(vnode: Vnode<TableListAttrs>) {
      const { attrs } = vnode;
      if (attrs.tables?.length == 0) {
        api.get<string[]>("tables").then(
          (tables) => {
            state.tables = tables;
            m.redraw();
          },
        );
      }
    },
    view(vnode: Vnode<TableListAttrs>) {
      const { attrs } = vnode;
      return m(DataGrid, {
        columns: ["actions", "table name"],
        records: state.tables.map(renderItem),
      });
    },
  };
  function renderItem(tableMeta: string) {
    return [
      button({
        onclick: () => {
          navigate({
            table: tableMeta,
            view: "view-table",
          });
        },
      }, "Data"),
      tableMeta,
    ];
  }
}
