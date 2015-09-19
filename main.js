// code is executed on all amazon pages
var pageText = $("body").text()
if (pageText.includes("ISBN-13")) {
  // find isbn string: label+isbn
  var offset = pageText.indexOf("ISBN-13");
  // get just the isbn
  var isbn = pageText.substring(offset+9, offset+23);
  var zip = "17837";
  // generate url for worldcatAPI
  var url = "http://www.worldcat.org/webservices/catalog/content/libraries/isbn/" + isbn + "?location=" + zip + "&wskey=L3JVoU9Pwa8fnHsYaktJU3SpXCRZYbyK0Hh3T2a94NcXrnKiQPZ6l2YhqqJN73osOdEhVJcmKUHCFAHu&format=json";
  $.getJSON(url, function( data ) {
      console.log(data);
      var lib = data.library[0];
      // generate html string for amazon page (copied from another element)
      htmlString = generateHTMLString(isbn, lib.institutionName, lib.distance)
    // add to the html
    $(".a-button-list").css("overflow-x", "auto").append(htmlString);
  });
}

function generateHTMLString(isbn, library, distance) {
  return '<li class="swatchElement unselected"> \
                    <span class="a-list-item"> \
                      <span class="a-button a-spacing-mini a-button-toggle format" id="a-autoid-5"> \
                        <span class="a-button-inner"> \
                          <a href="http://worldcat.org/search?q=' + isbn + '" target="_blank" class="a-button-text" role="button" id="a-autoid-5-announce"> \
                           <span>' + library + '\
                           </span> <br> \
                           <span class="a-color-secondary"> \
                             <span> \
                               Free! \
                             </span> \
                           </span> \
                          </a> \
                        </span> \
                      </span> \
                      <span class="tmm-olp-links"> \
                      </span> \
                      <span class="tmm-olp-links a-size-mini a-color-secondary"> \
                        distance: ' + distance + ' miles \
                      </span> \
                   </span> \
                 </li>';
}
