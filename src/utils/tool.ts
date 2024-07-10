import { customAlphabet } from 'nanoid'

export const nanoid = (len = 10) => {
  return customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', len)()
}
