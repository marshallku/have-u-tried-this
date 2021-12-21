const fs = require("fs");

fs.cp("./static", "./dist", { recursive: true }, async (err) => {
  // Copy ./static to ..dist
  if (err) {
    throw err;
  }

  console.log("Copied [./public] to [./dist]");

  // Remove ./dist/icon
  fs.rm("./dist/icon", { recursive: true }, (rmErr) => {
    if (rmErr) {
      throw rmErr;
    }

    console.log("Deleted [./dist/icon]");
  });

  // Replace path in js
  const data = fs.readFileSync("./dist/main.js", "utf-8");
  const newValue = data.replaceAll("/static", "");

  fs.writeFileSync("./dist/main.js", newValue, "utf-8");

  console.log("Replaced [/static] to [] in [./dist/main.js]");
});
