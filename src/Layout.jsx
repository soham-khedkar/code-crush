import React from "react";
import { Link } from "react-router-dom"; // Link for navigation
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      {/* Render the children passed to the Layout component */}
      <main className="p-4">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
