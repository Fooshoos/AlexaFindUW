// Scrapes msamlin website for underwriter details
//
// grab the uw names from the drop down list in the home page
// load each uwjs's page and grab their details
// log them in JSON format
//

const  request =require('request'),
       fs = require('fs'),
	     cheerio =require('cheerio');
const customHeaderRequest = request.defaults({ // put this in to avoid 403 return code from the web page
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
  })
let classOfBiz=[], uw=[], uwList=[];
let uwjson={name: "", phone: "", email: "", position: "", location: "", classes: ""};
const urlStub = 'https://www.msamlin.com/content/ms-amlin/corporate/en/find/underwriters/';

function getTheUrls(homePage){
  customHeaderRequest.get(homePage, function(err, resp, html){
    if(!err){
      let $ = cheerio.load(html);
      $('select ').children().each(function(i,element){
        var url = urlStub + $(this).text().trim() + '.html'
        url=url.replace(/\s+/g, '-');
        url=url.replace("'", "_");
        url=url.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        url=url.toLowerCase();
        getUw(url, logUw);
      });
    }
  });
}

function getUw(myUrl, callback){
  customHeaderRequest.get(myUrl, function(err, resp, html){
    if(!err){
      console.log('getting ' , myUrl);
      let $ = cheerio.load(html);
      name = $('div.underwriter-row.title-row').text().trim();
//      phone = $('div.phonenumber').html().trim();
      phone = $('div.phonenumber').html();
      email = $('div.emailaddress').text().trim();
      position = $('div.jobtitle').text().trim();
      location = $('div.underwriter-row a').first().text();
      $('div.underwriter-row li').each(function(i, element){
        classOfBiz.push($(this).text());
        });
      uwjson.name = name;
      uwjson.phone = phone;
      uwjson.email = email;
      uwjson.position = position;
      uwjson.location = location;
      uwjson.classes = classOfBiz;
//      console.log(uwjson);
    }
  })
callback(uwjson);
}

function logUw(uw){
  uwList.push(uw);
  fs.appendFileSync('output.json', JSON.stringify(uwList, null, 4);
}

getTheUrls('https://www.msamlin.com/index.html');
