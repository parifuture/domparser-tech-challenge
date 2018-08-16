'use strict';

// Assumptions
// All the index.html file will contain HTML tag as the root node
// If the text inside an element is new line it will be ignored

class Folderize {
  constructor() {

    this.result = '';
    this.currentNodeParsingStack = [];
    this.globalCounter = 1;
    this.folderTemplateModal = `
<link class="do-not-folderize" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
<script class="do-not-folderize" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
<div class="do-not-folderize">
    <!-- Bootstrap core CSS -->		
    <link href="css/bootstrap.min.css" rel="stylesheet">		
    <!-- Custom styles for this template -->		
    <link href="css/dashboard.css" rel="stylesheet">
  <button type="button" id="folderize-btn" class="btn btn-primary" data-toggle="modal" data-target="#folderizeModal">
      Folderize
  </button>

  <!--Modal -->
    <div class="modal fade" id="folderizeModal" tabindex="-1" role="dialog" aria-labelledby="folderizeModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="folderizeModalLabel">Title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">		
              <nav class="col-md-2 d-none d-md-block bg-light sidebar">		
                <div class="sidebar-sticky">		
                  <ul class="nav flex-column">		
                    <li class="nav-item" style="border-bottom:1px solid #e8e8e8;border-top:1px solid #e8e8e8;">		
                      <label style="color: #b2b2b2;padding-left: 2.5em;padding-top: 0.75em;">Label</label>		
                    </li>
                  </ul>		
                </div>
              </nav>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link">Link</button>
            <button type="button" class="btn btn-primary">Done</button>
          </div>
        </div>
      </div>
    </div>
    </div>`
  }

  // function to truncate the file/folder name and add ellpisie in the end
  truncateText(str) {
    if (str.length > 30) {
      str = str.trim().substring(0, 10).split(" ").slice(0, -1).join(" ") + "...";
    }
    return str;
  }

  createFolderFromDomElement(node) {
    /*
    * A recusrive function that parses the DOM
    * Is responsible for creating the tree structure
    */
    self = this;
    node = $(node);
    let folderStructure = '';
    let childrenNodeCount = node.contents().length;
    if (childrenNodeCount > 0) {
      if (self.result.length === 0) {
        self.result += '<ul class="root">';
      } else {
        self.result += '<ul class="sub-list collapse" id="menu-item-' + self.globalCounter + '">';
        self.globalCounter++;
      }

      $(node).contents().map(function (val, i) {
        if (i.nodeType === 1) {
          // i.localName = truncateText(i.localName);
          let hrefLink = 'href = "#"'
          // if the tag contains text then we are adding the collapse
          if(i.innerHTML.length > 0 ) {
            hrefLink = `href = "#menu-item-${self.globalCounter}"`;
          }
          if (i.localName === 'head') {
            self.result += `<li class="nav-item folder private-folder"><a data-toggle="collapse" class="nav-link" ${hrefLink}> <img class="ui-action expand-img" src='images/icon-sprite.png' alt='Icons'>
                  <img class="private-folder-img" src='images/icon-sprite.png' alt='Icons'>
                  <span>${i.localName}</span>
                </a></li>`;
          } else {
            self.result += `<li class="nav-item folder"><a class="nav-link" data-toggle="collapse"  ${hrefLink}><img class="ui-action expand-img" src='images/icon-sprite.png' alt='Icons'>
                  <img class="folder-img" src='images/icon-sprite.png' alt='Icons'>
                  <span>${i.localName}</span>
                </a></li>`;
          }

          if (i.className !== 'do-not-folderize') {
            self.createFolderFromDomElement(i);
          }
        } else if (i.nodeType === 3) {
          let nodeText = i.data;
          nodeText = self.truncateText(nodeText);
          if (typeof nodeText !== undefined) {
            nodeText = nodeText.trim();
            if (nodeText.length > 0) {
              self.result += `<li class="nav-item file"><a class="nav-link" href="#">
                  <img class="file-img" src='images/icon-sprite.png' alt='Icons'>
                  <span>${nodeText}</span>
                </a></li>`;
            }
          }
        }
      });
      self.result += '</ul>';
    }
    return self.result;
  }

  parseDom (node = 'html') {
    self = this;
    if (this.result.length === 0) {
      let result = self.createFolderFromDomElement(node);
      $('#folderizeModal .modal-body').html(result);
    }
  }
}

  // the code below is used for UI/UX interactions
  // *** START *** 
  $(document).ready(function () {
    let newObject = new Folderize();
    $('body').append(newObject.folderTemplateModal);
    newObject.parseDom();
    $("#folderize-btn").click(function () {
      newObject.parseDom('html');
    });

    $("#folderizeModal").on("click", ".nav-link", function (event) {
      // first we remove all active state folder files
      $('.active').removeClass('active');

      // check to see if we are collapsing a folder 
      // Yes then remove highlight
      // No then add highlight
      if ($(this).children('.ui-action').hasClass('expand-img')) {
        $(this).parent('li').toggleClass('active');
      }
      // code to change the image
      $(this).children('.ui-action').toggleClass('expand-img');
      $(this).children('.ui-action').toggleClass('collapse-img');      
    });

    // $("#folderizeModal").on("click", ".collapse-img", function () {
    // $(this).removeClass('collapse-img');
    // $(this).addClass('expand-img');
    // $(this).parent('li').next().toggleClass("show");
    // $(this).css('object-position', '-42px 0px');
    // });

    $("#folderizeModal").on("click", ".file", function () {
      // if (!$(this).hasClass('active')) {
      $('.active').removeClass('active');
      // }
      $(this).toggleClass('active');
    });
  });
  // *** UI/UX END *** 
// };


