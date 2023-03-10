import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import { logo } from './assets';
import { Home, CreatePost } from '../src/page';


const App = () => {
  return (

  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link to="/">
        <h2 className='text-3xl font-bold font-sans font-mono '> ImagiGen </h2> 
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md bg-sky-500/100">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] background: lightgrey">
      <Routes>
        <Route path="/" element={<Home />} />
       <Route className="body" path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
  
);
  }
export default App;
