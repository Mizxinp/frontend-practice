const { build } = require("esbuild");
const html = require("./html-plugin");
async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ["./index.jsx"],
    outdir: "dist",
    bundle: true,
    format: "esm",
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [html()],
  }).then(() => {
    console.log("🚀 Build Finished!");
  });
}

runBuild();
