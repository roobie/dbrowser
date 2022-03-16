import { parameters } from "./document-parameters.ts";
import { TableList } from "./component.table-list.ts";
import { RecordExplorer } from "./component.record-explorer.ts";
import { TableExplorer } from "./component.table-explorer.ts";
import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { div, a, span, button, table, thead, tbody, tr, td, th, pre } =
  hyperscriptHelper(m);

export function MainArea() {
  return {
    view(vnode: Vnode) {
      return div({ className: "main-area layout col space-x" }, getView());
    },
  };
  function getView() {
    if (parameters.view === "index") {
      return m(TableList, { tables: [] });
    } else if (parameters.view === "view-table") {
      return m(TableExplorer, { table: parameters.table });
    } else if (parameters.view === "view-record") {
      return m(RecordExplorer, {
        table: parameters.table,
        primaryKeyValue: parseInt(parameters.primaryKeyValue, 10),
      });
    } else {
      return div("Unknown view");
    }
  }
}
