const {JSDOM} = require('jsdom')

async function crawlPage(currentURL) {
  console.log(`Actively crawling ${currentURL}........`)
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399) {
      console.log(`Error with status code: ${resp.status} from page: ${currentURL}`)
      return
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes ("text/html")) {
      console.log(`None HTML response. Content type: ${contentType} from page: ${currentURL}`)
      return
    }
    const crawledWebsite = await resp.text()
    console.log(crawledWebsite);

  } catch (err) {
    console.log(`Error in fetching the website: ${currentURL}\nError message: ${err.message}`)
  }
}

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
  crawlPage
};
