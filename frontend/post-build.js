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

  // Replace path in html
  const htmlData = fs.readFileSync("./dist/index.html", "utf-8");
  const newHtmlValue = htmlData
    .replaceAll("/static", "")
    .replace(/main\.(js|css)/gim, "/main.$1");

  fs.writeFileSync("./dist/index.html", newHtmlValue, "utf-8");

  console.log("Replaced values in [./dist/index.html]");
});
