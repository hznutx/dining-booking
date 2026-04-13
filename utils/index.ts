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
