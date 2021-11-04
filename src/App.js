import React from 'react';
import Navbar from './components/header/NavBar';
import Footer from './components/footer/Footer';
import './App.scss';
import Stories from './components/stories/Stories';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Stories />
      </div>
      <Footer />
    </div>
  );
};

export default App;
