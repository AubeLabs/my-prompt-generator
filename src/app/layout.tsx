// import type { Metadata } from "next";
// import Head from "next/head";
import Head from "./head";
import "./globals.css";
import Header from '../components/Header';

// export const metadata: Metadata = {
//   title: "ChatGPT 프롬프트 생성기",
//   description: "ChatGPT 프롬프트 생성기",
// };

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <Head />
      <body>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="container mx-auto py-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;