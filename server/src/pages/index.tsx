import type { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

export default function IndexPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    let distPath = path.join(process.cwd(), '../client/web/dist/index.html');
    if (!fs.existsSync(distPath)) {
      distPath = path.join(process.cwd(), 'client/web/dist/index.html');
    }

    if (!fs.existsSync(distPath)) {
      res.statusCode = 404;
      res.write('Web client build asset not found. Please make sure to run yarn web:build in client.');
      res.end();
      return { props: {} };
    }

    const fileContents = fs.readFileSync(distPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.write(fileContents);
    res.end();
  } catch (error: any) {
    res.statusCode = 500;
    res.write(`Error reading build asset: ${error.message}`);
    res.end();
  }
  return { props: {} };
};
