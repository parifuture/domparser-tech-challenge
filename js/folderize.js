'use strict';

// Assumptions
// All the index.html file will contain HTML tag as the root node
// If the text inside an element is new line it will be ignored


// The following requirements were not clear
// In mockup.png there are no requirements for the Lable element (what it represents)
// In mockup.png there are no requirements for the Link element(what it represents)
// In mockup.png there are no requirements for the Title element (what it represents) 

// TODO
// When a folder/file is selected update the collapse/expand icon to be white
// The font color of text used in the file/folder name is not clear, an exact hex value will help resolve the issue

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
            <div class="ribbon"></div>
            <div id="folder-list"></div>

          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <button type="button" class="btn btn-link">Link</button>
                </div>
                <div class="col-sm"></div>
                <div class="col-sm">
                  <button type="button" style="margin-left: 3em;" class="btn btn-primary">Done</button>
                </div>
              </div>
            </div>
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
    const self = this;
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
          let hrefLink = 'href = "#"'
          // if the tag contains text then we are adding the collapse option
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
    const self = this;
    if (this.result.length === 0) {
      let result = self.createFolderFromDomElement(node);
      $('#folder-list').html(result);
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
      $('.ribbon').show();
      $('.active').removeClass('active');
      $('.ribbon').offset({top: $(this).offset().top-2});


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

    $("#folderizeModal").on("click", ".file", function () {
      $('.active').removeClass('active');
      $(this).toggleClass('active');
    });
  });
  // *** UI/UX END *** 
