let result = '';
let currentNodeParsingStack = [];

let script = document.createElement('script');
script.onload = function () {
  const truncateText = function (str) {
    if (str.length > 30) {
      str.trim().substring(0, 10).split(" ").slice(0, -1).join(" ") + "...";
    }
    return str;
  }
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
          i.localName = truncateText(i.localName);
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
          nodeText = truncateText(nodeText);
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

  const parseDom = function (node = 'html') {
    let result = createFolderFromDomElement(node);
    // result = finalOutputHtmlHeader + result + finalOutputHtmlFooter;
    updateModal(result);
  }

  const updateModal = function (result) {
    $('#folderizeModal .modal-body').html(result);
    // $("html").html(result);
  }

  const folderTemplateModal = `
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
<div id="do-not-folderize">
  <button type="button" id="folderize-btn" class="btn btn-primary" data-toggle="modal" data-target="#folderizeModal">
      Folderize
  </button>

  <!--Modal -->
    <div class="modal fade" id="folderizeModal" tabindex="-1" role="dialog" aria-labelledby="folderizeModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="folderizeModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
      </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </div>`;
  $(document).ready(function () {
    $('body').append(folderTemplateModal);
    $("#folderize-btn").click(function(){
      parseDom('html');
    })
  });
};
script.src = 'https://code.jquery.com/jquery-3.3.1.js';
{/* <script src="https://code.jquery.com/jquery-3.3.1.js"></script> */}
document.head.appendChild(script);
