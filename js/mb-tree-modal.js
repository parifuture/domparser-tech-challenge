let result = '';
let currentNodeParsingStack = [];

let finalOutput = `<!DOCTYPE html>
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
        Title
      </a>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <label>Label</label>
              </li>
              ${result}
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          Text Fill
        </main>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <script src="js/bootstrap.min.js"></script>
</body></html>`;


const createFolderFromDomElement = function (node) {
// techChallenge.createFolderFromDomElement = function (node) {

    /*
    * DOM element nodes should be represented as "folders"
    * Display the DOM element tag name next to folders
    * Folders can be expanded and collapsed by clicking
    */
    node = $(node);
    let folderStructure = '';
    let childrenNodeCount = node.contents().length;
    if (childrenNodeCount > 0) {
            result += '<ul>';
        $(node).contents().map(function (val, i) {
            if (i.nodeType === 1) {
                if (i.localName === 'head') {
                    result += `<li class="nav-item private-folder"><a class="nav-link" href="#">
                  <img class="" src='images/icon-sprite.png' alt='Icons'>
                  <span>${i.localName}</span>
                </a></li>`;
                } else {
                    result += `<li class="nav-item folder"><a class="nav-link" href="#">
                  <img class="" src='images/icon-sprite.png' alt='Icons'>
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
                  <img class="" src='images/icon-sprite.png' alt='Icons'>
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

const createFileFromTextNode = function (textArray) {
    /*
        * Text nodes should be represented as "files"
        * Display a single line of text content next to "files"
        * Text truncates with ellipsis if too wide
    */
   let fileList = '<ul class="file-list">';
    fileList += `<li class="file">${textArray}</li>`;
    fileList += `</ul>`;
    return fileList;
}

// if no node is passed then we will start from the root node
// Assumption: All the index.html file will contain HTML tag as the root node
// Assumpttion: If the text field inside an element is a new line space it will be ignored

const parseDom = function (node='html') {

    // loop thru all the elements (text and node) inside the passed node
    createFolderFromDomElement(node);
    // $(node).contents().map(function (val, i) {
    //     // if (currentNodeParsingStack.includes(i.parentElement.localName)) {
            
    //     // }
    //     currentNodeParsingStack.push(i.parentElement.localName);
    //     // check to see if the pass node has a html tag children
    //     if(i.nodeType === 1) {
    //         result += createFolderFromDomElement(i);
    //         let nodeText = i.data;
    //         if(typeof nodeText !== "undefined") {
    //             nodeText = nodeText.trim();
    //             if (nodeText.length > 0) {
    //                 result += createFileFromTextNode(nodeText);
    //             }
    //         }
    //         // nodeType 1 = HTML tag and we will call the parseDom recursively
    //         // put the logic to determine wheather the childer are of type element/node
    //         parseDom(i.localName);
    //     } else if (i.nodeType === 3) {
    //         let nodeText = i.data;
    //         if (typeof nodeText !== undefined) {
    //             nodeText = nodeText.trim();
    //             if (nodeText.length > 0) {
    //                 result += createFileFromTextNode(nodeText);
    //             }
    //         }
    //     }
    //     // <ul><li class="folder">h1</li><li class="folder">h3</li><li class="folder">ul</li><li class="folder">p</li><li class="folder">link</li>
    //     return result;
    // });

    // const allElements = document.querySelectorAll('html');
    // const divyArray = [...allElements];
    // const allElementsArray = Array.from(allElements);
    // const head = allElements.removeChild('head');
    // $(elem)
    //     .contents()
    //     .map(function () {
    //         return this.nodeType === 3; //Node.TEXT_NODE
    //     });
    // allElements.forEach((element) => {
    // });

}

$(document).ready(function() {
    parseDom('html');
    setTimeout(document.write(finalOutput), 1000);
});

// module.exports = techChallenge;