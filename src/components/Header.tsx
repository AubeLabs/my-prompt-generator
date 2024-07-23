import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold">ChatGPT 프롬프트 생성기</h1>
      </Link>
      <Link href="/settings">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a6 6 0 015.25 5.75c0 1.067-.226 2.083-.645 3H16.5a2.5 2.5 0 110 5h-2.14a7.6 7.6 0 01-1.97 2H16.5a4.5 4.5 0 000-9h-.22a6 6 0 00-5.84-5.75A6 6 0 009.75 3z" />
        </svg>
      </Link>
    </header>
  );
};

export default Header;