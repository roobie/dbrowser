import m from "mithril";
import { Vnode } from "mithril";
import { Toolbar } from "./component.toolbar.ts";
import { Sidebar } from "./component.sidebar.ts";
import { MainArea } from "./component.main-area.ts";
import hyperscriptHelper from "hyperscript-helpers";
const { div } = hyperscriptHelper(m);

function App() {
  return {
    view(vnode: Vnode) {
      return div({ className: "layout col" }, [
        m(Toolbar),
        div({ className: "layout row" }, [
          m(Sidebar),
          m(MainArea),
        ]),
      ]);
    },
  };
}

window.document.addEventListener("DOMContentLoaded", function () {
  // const root = window.document.querySelector("#app-root");
  // m.mount(root, App);
  m.mount(window.document.body, App);
});
