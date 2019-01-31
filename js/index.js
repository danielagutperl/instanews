//choose a section
$("document").ready(function () {


  $(function () {
    $('#choose-a-section').on('change', function () {

      var selected = $(this).val();
      if (selected === '') {
        console.log(selected);
      };

      //get json specific to that section 'https...' + 'selected' + '.json?api-key=' + 'xisDLGyNhtkY6svtpYW6sxQDUGGwj4IO'
      $.ajax({
        method: 'GET',
        url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=' + 'xisDLGyNhtkY6svtpYW6sxQDUGGwj4IO',
      }).done(function (data) {
      
        // console.log(data.results[i].abstract);
        // console.log(data.results[i].url);
        // console.log(data.results[i].multimedia[4].url);

        // no images - filter results for ones without images
        // if (data.hello == null) {
        //   return; 
        // } // leaves the function if there's no data, so no more code runnning

        var filteredResults = data.results.filter(function(item) {
          return item.multimedia.length > 3;
        }).splice(0, 12);
        //takes index to start (first nbr) at and removes the number of items (2nd nbr) from the array



        // lopp through results to make articles 
        // for (var i = 0; i < 11; i++) 
        // for loop x 12 or !number of results .length
        // check out .map from js day??

        var output = '<ul>';
        for (var i = 0; i < filteredResults.length; i++) {
          var article = filteredResults[i];


          // make var to use in each output per article - what about jquery to create these - look at example!
          var articleAbstract = article.abstract;
          var backgroundImage = article.multimedia[4].url;
          var articleLink = article.url;
  
          // make output per article in variable
          var itemOutput = '<a href="' + articleLink + '" target="_blank">';
          itemOutput += '<div class="article" style="background-image:url(' + backgroundImage + ')">';
          itemOutput += '<div class="abstract">' + articleAbstract + '</div>';
          itemOutput += '</div>';
          itemOutput += '</a>';

          output += itemOutput;
        }
        output += '</ul>';

        // need attach or rather .append results to div results in html!!
         // also .empty() removes the articles/content fropm the element between selections

        $(".results").empty().append(output);
       
      });
    });
  });
});