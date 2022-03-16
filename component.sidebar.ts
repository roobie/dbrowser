import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { div, a, span, button, table, thead, tbody, tr, td, th, pre } =
  hyperscriptHelper(m);

export function Sidebar() {
  return {
    view(vnode: Vnode) {
      return div({ className: "sidebar layout col space-left" }, [
        button({
          className: "anchor-style",
          onclick: () => {
            navigate({
              view: "index",
            });
          },
        }, "index"),
      ]);
    },
  };
}
