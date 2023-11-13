const {JSDOM} = require('jsdom')
 
const getURLSFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    if(linkElement.href.slice(0, 1) === "/") {
      //relative
      try{
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative URL: ${err.message}`);
      }
      
    } else {
      //absolute
      try{
        const urlObj = new URL(`${linkElement.href}`);
        urls.push(urlObj.href);

      } catch (err){
        console.log(`Error with absolute URL: ${err.message}`);
      }
      
    }
   
  }
  return urls;
}


const normalizeUrl = (urlString) => {
  const urlObj = new URL(urlString);
  const hostname = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostname.length > 0 && hostname.slice(-1) === "/") {
    return hostname.slice(0, -1);
  }
  return hostname;
};

module.exports = {
  normalizeUrl,
  getURLSFromHTML,
};
