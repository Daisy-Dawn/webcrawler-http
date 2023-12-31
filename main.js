const {crawlPage} = require('./crawl')
const {printPages} = require('./sortPages')

async function main() {
    if(process.argv.length < 3) {
        console.log("No website url specified")
        process.exit(1);
    } else if (process.argv.length > 3) {
        console.log("Too many arguments\nCrawl accepts just one argument, that is the website")
    } else {
        const baseURL = process.argv[2]
        console.log(`Crawling website ${baseURL}..........`)
        const pages = await crawlPage(baseURL, baseURL, {})
       printPages(pages)
    }
    
    
}

main();