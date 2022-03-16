import { DB } from "https://deno.land/x/sqlite@v2.5.0/mod.ts";
import { Rows } from "https://deno.land/x/sqlite@v2.5.0/src/rows.ts";

export const rawDb = new DB("chinook.db");

rawDb.query("pragma SYNCHRONOUS=OFF");

export const db = {};
