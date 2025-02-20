var showdown  = require('showdown');
var fs = require('fs');
let filename = process.argv[3] || "Readme.md"
let outname = process.argv[4] || "Readme.html"
let pageTitle = process.argv[2] || ""
let styleLink = process.argv[5] || "./style.css"


fs.readFile(process.cwd() + '/' + filename, function (err, data) {
  if (err) {
    throw err; 
  }
  let text = data.toString();

  converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    simpleLineBreaks: true,
    ghMentions: true,
    tables: true
  });

  let preContent = `
  <html>
    <head>
      <title>` + pageTitle + `</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="` + styleLink + `">
    </head>
    <body>
      <div id='content'>
  `
  

  let postContent = `

      </div>
    </body>
  </html>`;
  html = preContent + converter.makeHtml(text) + postContent

  converter.setFlavor('github');
  console.log(html);

  let filePath = process.cwd() + "/" + outname;
  fs.writeFile(filePath, html, { flag: "wx" }, function(err) {
    if (err) {
      console.log("File '" + filePath + "' already exists. Aborted!");
    } else {
      console.log("Done, saved to " + filePath);
    }
  });
});
