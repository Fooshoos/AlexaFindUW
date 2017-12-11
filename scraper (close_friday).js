//
// scrapes msamlin website for underwriter details
//

const request =require('request'),
	  cheerio =require('cheerio');

// put this in to avoid 403 return code from the web page
const customHeaderRequest = request.defaults({
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
})

let classOfBiz = [], urls=[];

// first scrape the home page to get the u-w names which we turn into urls
let homePage = 'https://www.msamlin.com/en/index.html';
let urlStub = 'https://www.msamlin.com/content/ms-amlin/corporate/en/find/underwriters/'

customHeaderRequest.get(homePage, function(err, resp, html){
  if(!err){
    let $ = cheerio.load(html);
    $('select ').children().each(function(i,element){
  //    console.log('name :' , $(this).text().trim());
      var url = urlStub + $(this).text().trim() + '.html'
      url=url.replace(/\s+/g, '-');
      url=url.toLowerCase();
      console.log(url);
      urls.push(url);
    });
  }
  });

// then loop through all the uw's pages to get their details

for (var i = urls.length - 1; i >= 0; i--) {
  getUw(urls[i]);
};

//var Url = 'https://www.msamlin.com/content/ms-amlin/corporate/en/find/underwriters/agnes-bonnin.html';
//getUw(Url);
//var Url = 'https://www.msamlin.com/content/ms-amlin/corporate/en/find/underwriters/arek-glaas.html';
//getUw(Url);

function getUw(myUrl){
//  console.log('in getUw');
  customHeaderRequest.get(myUrl, function(err, resp, html){
  if(!err){
    console.log('getting ' , myUrl);
    let $ = cheerio.load(html);
    name = $('div.underwriter-row.title-row').text().trim();
    phone = $('div.phonenumber').html().trim();
    email = $('div.emailaddress').text().trim();
    position = $('div.jobtitle').text().trim();
    location = $('div.underwriter-row a').first().text();
    $('div.underwriter-row li').each(function(i, element){
      classOfBiz.push($(this).text());
      });

  var uwjson = {"name": name,
               "phone": phone,
               "email": email,
           "position" : position,
           "location" : location,
            "classes" : classOfBiz
         };
  uw.push(uwjson);
  console.log('got: ', name);
  }
 })
}