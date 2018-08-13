let result = '';
let currentNodeParsingStack = [];

const finalOutputHtmlHeader = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Tech challenge">
    <meta name="author" content="Parik">
    <title>Tech Challenge</title>
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
</head>
  <body>
    <nav class="navbar navbar-light fixed-top bg-light flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        <h5 style="padding-left: 2.5em;">Title</h5>
      </a>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item" style="border-bottom:1px solid #e8e8e8;border-top:1px solid #e8e8e8;">
                <label style="color: #b2b2b2;padding-left: 2.5em;padding-top: 0.75em;">Label</label>
              </li>`;
const finalOutputHtmlFooter = `</ul>
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          Text Fill
        </main>
      </div>
    </div>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/mb-ui-interactions.js"></script>
</body></html>`;


const createFolderFromDomElement = function (node) {

    /*
    * DOM element nodes should be represented as "folders"
    * Display the DOM element tag name next to folders
    * Folders can be expanded and collapsed by clicking
    * Text nodes should be represented as "files"
    * Display a single line of text content next to "files"
    * Text truncates with ellipsis if too wide
    */
    node = $(node);
    let folderStructure = '';
    let childrenNodeCount = node.contents().length;
    if (childrenNodeCount > 0) {
            result += '<ul>';
        $(node).contents().map(function (val, i) {
            if (i.nodeType === 1) {
                if (i.localName === 'head') {
                  result += `<li class="nav-item private-folder"><img class="expand-img" src='images/icon-sprite.png' alt='Icons'><a class="nav-link" href="#">
                  <img class="private-folder-img" src='images/icon-sprite.png' alt='Icons'>
                  <span>${i.localName}</span>
                </a></li>`;
                } else {
                  result += `<li class="nav-item folder"><img class="expand-img" src='images/icon-sprite.png' alt='Icons'><a class="nav-link" href="#">
                  <img class="folder-img" src='images/icon-sprite.png' alt='Icons'>
                  <span>${i.localName}</span>
                </a></li>`;
                }
                createFolderFromDomElement(i);
            } else if (i.nodeType === 3) {
                let nodeText = i.data;
                if (typeof nodeText !== undefined) {
                    nodeText = nodeText.trim();
                    if (nodeText.length > 0) {
                        result += `<li class="nav-item file"><a class="nav-link" href="#">
                  <img class="file-img" src='images/icon-sprite.png' alt='Icons'>
                  <span>${nodeText}</span>
                </a></li>`;
                    }
                }
            }
        });
            result += '</ul>';
    }
   return result;
}

// if no node is passed then we will start from the root node
// Assumption: All the index.html file will contain HTML tag as the root node
// Assumpttion: If the text field inside an element is a new line space it will be ignored

const parseDom = function (node='html') {
  let result =  createFolderFromDomElement(node);
  result = finalOutputHtmlHeader + result + finalOutputHtmlFooter;
  updatePage(result);
}

const updatePage = function(result) {
  $("html").html(result);
}

$(document).ready(function() {
    parseDom('html');
});
