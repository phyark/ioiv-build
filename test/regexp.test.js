import { isEmail } from '../src/regexp'

test('isEmail true', function () {
  expect(isEmail("phyark@github.io")).toEqual(true)
})

test('isEmail false', function () {
  expect(isEmail("phyarkgithub.io")).toEqual(false)
})