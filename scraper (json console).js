const request =require('request'),
	  cheerio =require('cheerio');

// put this in to avoid 403 return code from the web page
const customHeaderRequest = request.defaults({
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
})

let classOfBiz = [];
let myUrl = 'https://www.msamlin.com/content/ms-amlin/corporate/en/find/underwriters/agnes-bonnin.html';

customHeaderRequest.get(myUrl, function(err, resp, html){
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

console.log(uwjson);

  });
