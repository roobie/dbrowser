import m from "mithril";
import { Vnode } from "mithril";
import hyperscriptHelper from "hyperscript-helpers";

const { div, span, button, table, thead, tbody, tr, td, th } =
  hyperscriptHelper(m);

export interface IStringifiable {
  toString: () => string;
}
export type DataGridRecord = (IStringifiable | Vnode)[];
export interface DataGridColumnConfig {
  label: string;
  signals?: {
    onsort?: () => void;
  };
}
export type DataGridColumnItem = string | DataGridColumnConfig;
export interface DataGridAttrs {
  columns: DataGridColumnItem[];
  extraThead?: Vnode[];
  records: DataGridRecord[];
}

export function DataGrid(): Vnode {
  let sorting: string[] = [];

  return {
    view(vnode: Vnode<DataGridAttrs>) {
      const { attrs } = vnode;
      return table([
        thead([
          tr([
            attrs.columns.map((column: DataGridColumnItem) =>
              typeof (column) === "string"
                ? th(column)
                : th([span(column.label), button({}, "ᐃᐁ")])
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
