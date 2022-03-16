import m from "mithril";
import { Vnode } from "mithril";
import { TableList } from "./component.table-list.ts";
import { Toolbar } from "./component.toolbar.ts";
import { Sidebar } from "./component.sidebar.ts";
import { MainArea } from "./component.main-area.ts";
import { navigate } from "./navigation.ts";
import { when } from "./readability.ts";
import hyperscriptHelper from "hyperscript-helpers";

export function TableExplorer(vnode) {
  return {
    view() {
      const columns = state.db.columns[vnode.attrs.table];
      const data = state.db.data[vnode.attrs.table];
      return table([
        thead(tr([th("Actions")].concat(columns.map((c) => th(c))))),
        tbody(data.map((record) =>
          tr(
            [td(button({
              onclick: () => {
                navigate({
                  view: "view-record",
                  table: vnode.attrs.table,
                  primaryKeyValue:
                    record[state.db.keys.primary[vnode.attrs.table]],
                });
              },
            }, "Show"))].concat(
              columns.map((c) => td(record[c])),
            ),
          )
        )),
      ]);
    },
  };
}
