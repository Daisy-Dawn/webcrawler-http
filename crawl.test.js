const {normalizeUrl, getURLSFromHTML} = require('./crawl')

const {test, expect} = require('@jest/globals')

test('normalizeUrl Strip Protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl Strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl Strip Capital', () => {
    const input = 'https://blOG.boOt.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl Strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">Hello, Welcome to Boot.dev</a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Hello, Welcome to Boot.dev</a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML both relative and absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">Hello, Welcome to Boot.dev Path 1</a>
            <a href="https://blog.boot.dev/path2/">Hello, Welcome to Boot.dev path 2</a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path1/', "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Hello, I am an invalid URL</a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})


