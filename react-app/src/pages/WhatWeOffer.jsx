import React, { useState } from "react";

const services = [
  { id:1, title: "Market and Social Research", text: "High-quality research to support strategic decision-making." },
  { id:2, title: "Policy Development, Review, and Analysis", text: "Creating evidence-based, contextually relevant policies." },
  { id:3, title: "Organizational Capacity Assessment and Development", text: "Identify strengths, address gaps and improve performance." },
  { id:4, title: "Program Design, Quality Assurance, and Evaluation", text: "Ensure programs are impactful from start to finish." },
  { id:5, title: "Gender Equality and Social Inclusion (GESI)", text: "Apply GESI principles to create inclusive programs." },
  { id:6, title: "Systems Review and Risk Management", text: "Comprehensive systems analysis and risk mitigation." }
];

export default function WhatWeOffer() {
  const [flipped, setFlipped] = useState({});
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-center text-2xl font-bold text-picBlue mt-6">Our Services</h2>
      <p className="text-center mt-2 text-lg">At Phantom Impact Consulting (PIC), we offer a comprehensive suite of services designed to strengthen organizations and drive sustainable impact.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {services.map(s => (
          <button
            key={s.id}
            onClick={() => setFlipped(prev => ({...prev, [s.id]: !prev[s.id]}))}
            className={`relative p-6 rounded-lg shadow-lg transform transition-all duration-500 ${flipped[s.id] ? "bg-picOrange text-white h-48" : "bg-white text-picBlue h-40"}`}
            aria-pressed={!!flipped[s.id]}
          >
            {flipped[s.id] ? <p className="text-center">{s.text}</p> : <h5 className="text-center font-bold">{s.title}</h5>}
          </button>
        ))}
      </div>
    </div>
  );
}
