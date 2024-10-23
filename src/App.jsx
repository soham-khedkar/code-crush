import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './pages/Home'; // You can add more routes here
import About from './pages/About'; // Example route
import Contact from './pages/Contact'; // Example route
import Layout from './Layout'; // Layout component

function App() {
  return (
    <div>
      {/* Define Routes inside Layout */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
