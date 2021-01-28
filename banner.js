const authorName = "Sammy Baek";
const fs = require("fs");
const pkg = require("./package.json");
const filename = "assets/js/main.min.js";
const script = fs.readFileSync(filename);
const padStart = str => ("0" + str).slice(-2);
const dateObj = new Date();
const date = `${dateObj.getFullYear()}-${padStart(
  dateObj.getMonth() + 1
)}-${padStart(dateObj.getDate())}`;
const customBanner =
` * Customized Jekyll Theme by Sammy Baek
 * Copyright 2020-${dateObj.getFullYear()} ${authorName}. All rights reserved.`;
const banner = `/*!
${customBanner}
 * Powered by
 * Minimal Mistakes Jekyll Theme ${pkg.version} by ${pkg.author}
 * Copyright 2013-2020 Michael Rose - mademistakes.com | @mmistakes
 * Licensed under ${pkg.license}
 */
`;

if (script.slice(0, 3) != "/**") {
  fs.writeFileSync(filename, banner + script);
}

/* customs js */
const filename2 = "assets/js/customs.min.js";
const script2 = fs.readFileSync(filename2);
if (script2.slice(0, 3) != "/**") {
  fs.writeFileSync(filename2, banner + script2);
}
