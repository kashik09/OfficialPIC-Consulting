import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WhatWeOffer from "./pages/WhatWeOffer";
import OurExperiences from "./pages/OurExperiences";
import GetInTouch from "./pages/GetInTouch";
import OurTeam from "./pages/OurTeam";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-20 pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-offer" element={<WhatWeOffer />} />
          <Route path="/our-experiences" element={<OurExperiences />} />
          <Route path="/get-in-touch" element={<GetInTouch />} />
          <Route path="/our-team" element={<OurTeam />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
