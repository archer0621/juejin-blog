import {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en">
            <Head/>
            <body>
            <Main/>
            <NextScript/>
            <Script id="theme-script" strategy="beforeInteractive">
                {`const item = localStorage.getItem('theme') || 'light';
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].setAttribute('data-theme', item)`}
            </Script>
            </body>
        </Html>
    )
}
