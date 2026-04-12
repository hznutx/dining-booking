export const useCurrency = () => {
  const convert = (price: number, locale: 'en' | 'th' | string): string => {
    let sumPrice = price
    const isEn = locale === 'en'

    if (isEn) {
      sumPrice = Number(price / 32)
    }
    return isEn
      ? sumPrice.toFixed(2).toLocaleString()
      : sumPrice.toLocaleString()
  }
  return { convert }
}
