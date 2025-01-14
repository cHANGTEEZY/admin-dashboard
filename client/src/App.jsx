import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Pages from './pages/Pages'

function App() {
  return (
    <>
 <div className="grid gap-4 grid-cols-[320px,_1fr]">
  <div className="sticky top-0 h-screen">
    <Sidebar />
  </div>
  <Pages />
</div>


    </>

  );
}

export default App;
