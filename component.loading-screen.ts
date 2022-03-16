import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";
const { div, a, span, button, table, thead, tbody, tr, td, th, pre } =
  hyperscriptHelper(m);

interface Attrs {
  loading: boolean;
  element: Vnode;
}

export function LoadingScreen() {
  return {
    view(vnode: Vnode<Attrs>) {
      const { attrs } = vnode;
      if (attrs.loading) {
        return div({ className: "loading" }, "loading");
      } else {
        return attrs.element;
      }
    },
  };
}
