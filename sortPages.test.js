const {sortPages} = require('./sortPages')

const {test, expect} = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'http://blog.boot.dev/path': 1,
        'http://blog.boot.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['http://blog.boot.dev', 3],
        ['http://blog.boot.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'http://blog.boot.dev/path5': 5,
        'http://blog.boot.dev': 2,
        'http://blog.boot.dev/path1': 1,
        'http://blog.boot.dev/path9': 9,
        'http://blog.boot.dev/path3': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['http://blog.boot.dev/path9', 9],
        ['http://blog.boot.dev/path5', 5],
        ['http://blog.boot.dev/path3', 3],
        ['http://blog.boot.dev', 2],
        ['http://blog.boot.dev/path1', 1]
    ]
    expect(actual).toEqual(expected)
})