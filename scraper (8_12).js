const request =require('request'),
	  cheerio =require('cheerio');

// put this in to avoid 403 return code from the web page
const customHeaderRequest = request.defaults({
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
})

let underwriterDetails = [];
let classOfBiz = [];
let myUrl = 'https://www.msamlin.com/content/ms-amlin/corporate/en/find/underwriters/adam-wright-.html';

/*
customHeaderRequest.get(myUrl, function(err, resp, html){
  let $ = cheerio.load(html);
    $('div.underwriter-row').each(function(i, element){
      let a = $(this).last().next().next().next().next().next().next().children().children().children();
      let b = $(this).last().next().next().next().next().children().children();
      let c = $(this).last().children();
      let d = $(this).last().next().next().next().next().next().children();
      if (i == 0 )  {
console.log('CLASSES:' , a.text().trim());
console.log('EMAIL:' , b.text().trim());
console.log('NAME:' , c.text().trim());
console.log('PHONE:' , d.text());
console.log ('_____________________________');
      }
     }); */

customHeaderRequest.get(myUrl, function(err, resp, html){
  let $ = cheerio.load(html);
  console.log('name   : ', $('div.underwriter-row.title-row').text().trim());
  console.log('phone  : ', $('div.phonenumber').html().trim())
  console.log('email  : ', $('div.emailaddress').text().trim());
  console.log('position: ', $('div.jobtitle').text().trim());
  console.log('location: ', $('div.underwriter-row a').first().text());
  console.log('Classes:');
  $('div.underwriter-row li').each(function(i, element){
    console.log($(this).text());
    });
  });

customHeaderRequest.get(myUrl, function(err, resp, html){
  let $ = cheerio.load(html);
  name = $('div.underwriter-row.title-row').text().trim();
  phone = $('div.phonenumber').html().trim();
  email = $('div.emailaddress').text().trim();
  position = $('div.jobtitle').text().trim();
  location = $('div.underwriter-row a').first().text();
  $('div.underwriter-row li').each(function(i, element){
    classOfBiz.push({$(this).text()});
    });
console.log('details ',name,phone,email,position,location,classOfBiz);

  });


/*

customHeaderRequest.get(myUrl, function(err, resp, html){
  let $ = cheerio.load(html);
  var myUW = underwriter(

  console.log('name   : ', $('div.underwriter-row.title-row').text().trim());
  console.log('location  : ', $('div.phonenumber').html().trim())
  console.log('email  : ', $('div.emailaddress').text().trim());
  console.log('position: ', $('div.jobtitle').text().trim());
  $('div.underwriter-row li').each(function(i, element){
    console.log('Class:' , i, $(this).text());
    });
  });

*/
