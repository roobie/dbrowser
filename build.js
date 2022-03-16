require("esbuild").build({
  entryPoints: ["webapp.ts"],
  bundle: true,
  outfile: "out.js",
  sourcemap: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error("watch build failed:", error);
      else console.log("watch build succeeded:", result);
    },
  },
})
  .then((a) => console.log("Watching", a))
  .catch((a) => console.error(a));
