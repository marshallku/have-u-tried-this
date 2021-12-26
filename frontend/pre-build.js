const fs = require("fs");

fs.rm("./dist", { recursive: true }, (err) => {
  if (err) {
    console.log("[./dist] is not deleted");
  }

  console.log("Deleted [./dist]");
});
