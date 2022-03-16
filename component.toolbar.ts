import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { div, a, span, button, table, thead, tbody, tr, td, th, pre } =
  hyperscriptHelper(m);

export function Toolbar() {
  return {
    view(vnode: Vnode) {
      return div({ className: "toolbar layout row space-x" }, "toolbar");
    },
  };
}
