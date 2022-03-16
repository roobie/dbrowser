import m from "mithril";
import { Vnode } from "mithril";
import { TableList } from "./component.table-list.ts";
import { Toolbar } from "./component.toolbar.ts";
import { Sidebar } from "./component.sidebar.ts";
import { MainArea } from "./component.main-area.ts";
import { navigate } from "./navigation.ts";
import { when } from "./readability.ts";
import hyperscriptHelper from "hyperscript-helpers";

export function RecordExplorer(vnode) {
  return {
    oninit() {
      vnode.state.expanded = {};
    },
    view() {
      const pkeyCol = state.db.keys.primary[vnode.attrs.table];
      const record =
        state.db.data[vnode.attrs.table].filter((record) =>
          record[pkeyCol] === vnode.attrs.primaryKeyValue
        )[0];
      const columns = state.db.columns[vnode.attrs.table];
      return table([
        thead(tr([th("Column"), th("Value"), th("Complex value")])),
        tbody(columns.map((c) =>
          tr([
            td(c),
            td(record[c]),
            viewSub(c, record[c], vnode.attrs.table),
          ])
        )),
      ]);

      function viewSub(column, pk, table) {
        return td(getContents());
        function getContents() {
          const foreignKeys = state.db.keys.foreign[table];
          if (!foreignKeys) return null;
          const meta = foreignKeys[column];
          if (!meta) return null;
          if (vnode.state.expanded[meta.foreignKeyColumn]) {
            const item = div(
              { className: "layout col" },
              [
                div(
                  button({
                    onclick: () =>
                      vnode.state.expanded[meta.foreignKeyColumn] = false,
                  }, "Collapse"),
                ),
                div(
                  m(RecordExplorer, {
                    table: meta.referencedTable,
                    primaryKeyValue: pk,
                  }),
                ),
              ],
            );
            return item;
          } else {
            const item = button({
              onclick: () => vnode.state.expanded[meta.foreignKeyColumn] = true,
            }, "Expand");
            return item;
          }
        }
      }
    },
  };
}
