var authorName = "Sammy Baek";
var fs = require("fs");
var pkg = require("./package.json");
var filename = "assets/js/main.min.js";
var script = fs.readFileSync(filename);
var padStart = str => ("0" + str).slice(-2);
var dateObj = new Date();
var date = `${dateObj.getFullYear()}-${padStart(
  dateObj.getMonth() + 1
)}-${padStart(dateObj.getDate())}`;
var customBanner =
` * Customized Jekyll Theme by Sammy Baek
 * Copyright 2020-${dateObj.getFullYear()} ${authorName}. All rights reserved.`;
var banner = `/*!
${customBanner}
 * Powered by
 * Minimal Mistakes Jekyll Theme ${pkg.version} by ${pkg.author}
 * Copyright 2013-2020 Michael Rose - mademistakes.com | @mmistakes
 * Licensed under ${pkg.license}
 */
`;

if (script.slice(0, 3) != "/*!") {
  fs.writeFileSync(filename, banner + script);
}

/* customs js */
var filename = "assets/js/customs.min.js";
var script = fs.readFileSync(filename);
if (script.slice(0, 3) != "/*!") {
  fs.writeFileSync(filename, banner + script);
}

/* custom kakao js */
var filename = "assets/js/kakao-custom.min.js";
var script = fs.readFileSync(filename);
if (script.slice(0, 3) != "/*!") {
  fs.writeFileSync(filename, banner + script);
}
