import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'QuickHire - Job Board',
  description: 'Find your next job at QuickHire - A simple job board application',
  keywords: 'jobs, job board, careers, employment',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
