import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-50/90 backdrop-blur z-40 border-b-4 border-picBlue">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/assets/images/logos/navbar-logo.png" alt="PIC Logo" className="h-12 w-auto" />
        </a>
        <nav>
          <ul className="hidden md:flex gap-6 items-center text-picBlue font-medium">
            <li><NavLink to="/" className={({isActive})=> isActive ? "text-picLime underline":"hover:text-picLime"}>Who We Are</NavLink></li>
            <li><NavLink to="/what-we-offer" className={({isActive})=> isActive ? "text-picLime underline":"hover:text-picLime"}>What We Offer</NavLink></li>
            <li><NavLink to="/our-experiences" className={({isActive})=> isActive ? "text-picLime underline":"hover:text-picLime"}>Our Experiences</NavLink></li>
            <li><NavLink to="/our-team" className={({isActive})=> isActive ? "text-picLime underline":"hover:text-picLime"}>Our Team</NavLink></li>
            <li><NavLink to="/get-in-touch" className={({isActive})=> isActive ? "text-picLime underline":"hover:text-picLime"}>Get In Touch</NavLink></li>
          </ul>
          {/* Mobile menu trigger could be added here */}
        </nav>
      </div>
    </header>
  );
}
