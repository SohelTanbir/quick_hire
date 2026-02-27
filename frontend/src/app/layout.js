'use client';

import { Clash_Display, Epilogue, Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/store';
import './globals.css';

const clashDisplay = Clash_Display({
  variable: '--font-clash',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'QuickHire - Job Board',
  description: 'Find your next job at QuickHire - A simple job board application',
  keywords: 'jobs, job board, careers, employment',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${epilogue.variable} ${inter.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
