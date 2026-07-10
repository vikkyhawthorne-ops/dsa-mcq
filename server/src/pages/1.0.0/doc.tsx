import Head from 'next/head';
import Script from 'next/script';

export default function DocPage() {
  return (
    <>
      <Head>
        <title>DSA-MCQ API Documentation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
          rel="stylesheet"
        />
        <style>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </Head>

      <div id="redoc-container" style={{ minHeight: '100vh', width: '100%' }} />

      {/* Load Redoc Standalone Bundle using Next.js Script */}
      <Script
        src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).Redoc) {
            try {
              (window as any).Redoc.init(
                '/api/openapi.yaml',
                {
                  scrollYOffset: 50,
                  hideDownloadButton: false,
                },
                document.getElementById('redoc-container')
              );
              console.log('Redoc initialized successfully from /api/openapi.yaml on onLoad callback!');
            } catch (err) {
              console.error('Failed to initialize Redoc on onLoad callback:', err);
            }
          }
        }}
      />
    </>
  );
}
