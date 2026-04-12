import { Inter as FontSans, Prompt } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const prompt = Prompt({
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-prompt',
})
