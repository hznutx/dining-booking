import { ICategory } from '@/types/deal'

export const publicUrlSvgFile = (fileName: string): string => {
  return `/icons/${fileName}`
}

export const trimRegexPhone = (input: string) => {
  let value = input
  value = value.replace(/[^\d+]/g, '')
  if (value.includes('+')) {
    value = '+' + value.replace(/\+/g, '').replace(/[^0-9]/g, '')
  }
  return value.trim()
}

export const trimRegexCharacters = (input: string) => {
  const regexSpecialCharacters = /[!#$%^&*(),@ ?":{}|<>'+;&\[\]฿\\=`~\/\-]/g
  const regexThai = /[ก-๙]/
  let cleanedInput = input.replace(regexSpecialCharacters, '')
  cleanedInput = cleanedInput.replace(regexThai, '')
  return cleanedInput.trim()
}

export const getCateId = (cate: ICategory[], type: string): string => {
  if (!cate || !type) return '0'
  return cate
    ? cate?.find((item) => item.type == String(type))?.id.toString() || '0'
    : '0'
}
