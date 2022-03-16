import { when } from "./readability.ts";
import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";

const { div, span, button, table, thead, tbody, tr, td, th } =
  hyperscriptHelper(m);

export interface IStringifiable {
  toString: () => string;
}
export type SortDirection = "asc" | "desc";
export type DataGridRecord = (IStringifiable | Vnode)[];
export interface DataGridColumnConfig {
  label: string;
  sortDir: SortDirection;
  signals?: {
    onsort?: (dir: SortDirection) => void;
  };
}
export type DataGridColumnItem = string | DataGridColumnConfig;
export interface DataGridAttrs {
  columns: DataGridColumnItem[];
  extraThead?: Vnode[];
  records: DataGridRecord[];
}

export function DataGrid(): Vnode {
  return {
    view(vnode: Vnode<DataGridAttrs>) {
      const { attrs } = vnode;
      return table([
        thead([
          tr([
            attrs.columns.map((column: DataGridColumnItem) =>
              typeof (column) === "string" ? th(column) : th([
                span(column.label),
                when(typeof (column.sortDir) === "string", () =>
                  button({
                    onclick: () => {
                      const dir = column.sortDir === "asc" ? "desc" : "asc";
                      column?.signals?.onsort?.call(null, dir);
                    },
                  }, column.sortDir === "asc" ? "ᐃ" : "ᐁ")),
              ])
            ),
          ]),
        ].concat(attrs.extraThead || [])),
        tbody(
          attrs.records.map((record: DataGridRecord) =>
            tr(
              record.map((recordColumn) => td(recordColumn)),
            )
          ),
        ),
      ]);
    },
  };
}
