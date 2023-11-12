const {normalizeUrl} = require('./crawl')

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
