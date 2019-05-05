import assert from 'assert'
import EmojiCharString from '../src/EmojiCharString'

// constructor
describe('EmojiCharString Class constructor', () => {
  it('Throws an error if wrong arguments are specified.', () => {
    assert.throws(() => new EmojiCharString(), Error)
    assert.throws(() => new EmojiCharString({}), Error)
    assert.throws(() => new EmojiCharString([]), Error)
    assert.throws(() => new EmojiCharString(234), Error)
  })
})

// get
describe('Test EmojiCharString convert to a string', () => {
  it('get EmojiCharString convert to a string should return a string ', () => {
    assert.equal(new EmojiCharString('1️⃣'), '1️⃣')
    assert.equal(new EmojiCharString('1'), '1')
    assert.equal(new EmojiCharString('你好'), '你好')
  })
})

// length
describe('EmojiCharString Class length property', () => {
  it('Get empty string length correctly!', () => {
    assert.equal((new EmojiCharString('')).length, 0)
  })

  it('Get emoji string length correctly!', () => {
    assert.equal((new EmojiCharString('1️⃣')).length, 1)
  })
})

// reverse
describe('EmojiCharString Class reverse method', () => {
  it('Reverse string without emoji correctly.', () => {
    let emojiStr = new EmojiCharString('hello world')
    assert.equal(emojiStr.reverse(), 'dlrow olleh')
  })
  it('Reverse string with emoji correctly.', () => {
    let emojiStr = new EmojiCharString('👨‍👨‍👦 our family 我们一家 ❤️👏')
    assert.equal(emojiStr.reverse(), '👏❤️ 家一们我 ylimaf ruo 👨‍👨‍👦')
  })
  it('Reverse empty string correctly.', () => {
    let emojiStr = new EmojiCharString('')
    assert.equal(emojiStr.reverse(), '')
  })
})

// substring
describe('EmojiCharString Class substring method', () => {
  let str = '👨‍👨‍👦 our family 我们一家 ❤️'
  let emojiStr = new EmojiCharString(str)
  let emojiStrLen = emojiStr.length

  it('If begin is omitted, it will use default value 0.', () => {
    assert.equal(emojiStr.substring(), str)
  })

  it('If begin equals end, return an empty string.', () => {
    assert.equal(emojiStr.substring(0, 0), '')
    assert.equal(emojiStr.substring(5, 5), '')
    assert.equal(emojiStr.substring(emojiStrLen, emojiStrLen), '')
  })

  it('If end is omitted, return extracts characters to the end of the string.', () => {
    assert.equal(emojiStr.substring('abc'), str)
    assert.equal(emojiStr.substring(0), str)
    assert.equal(emojiStr.substring(4), 'r family 我们一家 ❤️')
    assert.equal(emojiStr.substring(emojiStrLen), '')
  })

  it('If either argument is less than 0 or is NaN, it is treated as if it were 0.', () => {
    assert.equal(emojiStr.substring(-1, emojiStrLen), str)
    assert.equal(emojiStr.substring(-1, 1), '👨‍👨‍👦')
    assert.equal(emojiStr.substring(NaN, emojiStrLen), str)
    // equal -> emojiStr.substring(0, 5)
    assert.equal(emojiStr.substring(5, NaN), '👨‍👨‍👦 our')
  })

  it('If either argument is greater than string length, it is treated as if it were string length.', () => {
    assert.equal(emojiStr.substring(0, 100), str)
    // equal -> emojiStr.substring(emojiStrLen, emojiStrLen)
    assert.equal(emojiStr.substring(100, 200), '')
  })

  it('If begin is greater than end, then the effect of substring() is as if the two arguments were swapped.', () => {
    // for example, str.substring(1, 0) == str.substring(0, 1).
    assert.equal(emojiStr.substring(100, 0), str)
    assert.equal(emojiStr.substring(-100, -500), '')
    assert.equal(emojiStr.substring(5, 0), '👨‍👨‍👦 our')
  })
})

// substr
describe('EmojiCharString Class substr method', () => {
  let str = '👨‍👨‍👦 our family 我们一家 ❤️'
  let emojiStr = new EmojiCharString(str)
  let emojiStrLen = emojiStr.length

  it('If begin is omitted, it will use default value 0.', () => {
    assert.equal(emojiStr.substr(), str)
  })

  it('If begin is positive and is greater than or equal to the length of the string, substr() returns an empty string.', () => {
    assert.equal(emojiStr.substr(emojiStrLen, 4), '')
    assert.equal(emojiStr.substr(emojiStrLen + 20, 4), '')
  })

  it('If begin is negative, substr() uses it as a character index from the end of the string.', () => {
    assert.equal(emojiStr.substr(-4, 4), '一家 ❤️')
    assert.equal(emojiStr.substr(-emojiStrLen, 4), '👨‍👨‍👦 ou')
  })

  it('If begin is negative and abs(start) is larger than the length of the string, substr() uses 0 as the start index.', () => {
    assert.equal(emojiStr.substr(-200, 4), '👨‍👨‍👦 ou')
    assert.equal(emojiStr.substr(-300, 6), '👨‍👨‍👦 our ')
  })

  it('If length is omitted, substr() extracts characters to the end of the string.', () => {
    assert.equal(emojiStr.substr(0), str)
    assert.equal(emojiStr.substr(2), 'our family 我们一家 ❤️')
    assert.equal(emojiStr.substr(emojiStrLen), '')
  })

  it('If length is 0 or negative or not a number, substr() returns an empty string.', () => {
    assert.equal(emojiStr.substr(0, 0), '')
    assert.equal(emojiStr.substr(4, 0), '')
    assert.equal(emojiStr.substr(5, -20), '')
    assert.equal(emojiStr.substr(100, -20), '')
    assert.equal(emojiStr.substr(0, 'hello'), '')
  })
})

// slice
describe.only('EmojiCharString Class slice method', () => {
  let str = '👨‍👨‍👦 our family 我们一家 ❤️'
  let emojiStr = new EmojiCharString(str)
  let emojiStrLen = emojiStr.length

  it('If begin is omitted, it will use default value 0.', () => {
    assert.equal(emojiStr.slice(), str)
  })

  it('If begin is positive and is greater than or equal to the length of the string, slice() returns an empty string.', () => {
    assert.equal(emojiStr.slice(emojiStrLen, 4), '')
    assert.equal(emojiStr.slice(emojiStrLen + 20, 4), '')
  })

  it('If begin is negative, slice() uses it as a character index from the end of the string.', () => {
    assert.equal(emojiStr.slice(-4), '一家 ❤️')
    assert.equal(emojiStr.slice(-emojiStrLen, 4), '👨‍👨‍👦 ou')
  })

  it('If begin is negative and abs(start) is larger than the length of the string, slice() uses 0 as the start index.', () => {
    assert.equal(emojiStr.slice(-200, 4), '👨‍👨‍👦 ou')
    assert.equal(emojiStr.slice(-300, 6), '👨‍👨‍👦 our ')
  })

  it('If length is omitted, slice() extracts characters to the end of the string.', () => {
    assert.equal(emojiStr.slice(0), str)
    assert.equal(emojiStr.slice(2), 'our family 我们一家 ❤️')
    assert.equal(emojiStr.slice(emojiStrLen), '')
  })

  it('If length is 0 or negative or not a number, slice() returns an empty string.', () => {
    assert.equal(emojiStr.slice(0, 0), '')
    assert.equal(emojiStr.slice(4, 0), '')
    assert.equal(emojiStr.slice(5, -20), '')
    assert.equal(emojiStr.slice(100, -20), '')
    assert.equal(emojiStr.slice(0, 'hello'), '')
  })
})
