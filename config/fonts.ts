import { Fira_Code as FontMono, Inter as FontSans, Prompt } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const prompt = Prompt({
  weight: ['200', '300'],
  style: ['normal', 'italic'],
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-prompt',
});
