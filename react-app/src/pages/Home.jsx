import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <section className="bg-picBlue rounded-xl text-center text-white py-12 px-6 mt-6">
        <div className="md:flex md:items-center md:gap-6">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-picLime">Welcome to <br/>Phantom Impact Consulting</h1>
            <p className="mt-4 text-white/90 font-medium">Tailored, evidence-based solutions to drive sustainable impact.</p>
            <Link to="/what-we-offer" className="inline-block mt-4 bg-picOrange hover:bg-picLime text-white font-bold py-2 px-5 rounded">Learn More</Link>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img src="/assets/images/carousel/MapChart_Map.png" alt="Map" className="rounded object-cover w-full max-h-56 mx-auto"/>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-picBlue text-center">About Us</h2>
        <p className="mt-4 text-justify text-lg">
          At Phantom Impact Consulting (PIC), we provide tailored, evidence-based solutions... {/* truncated for brevity */}
        </p>
      </section>

      <section className="mt-8 bg-picBlue text-white rounded-lg text-center py-8">
        <h3 className="text-xl font-bold text-picLime">Get in Touch</h3>
        <p className="mt-2">Ready to create lasting impact? Contact us today.</p>
        <Link to="/get-in-touch" className="inline-block mt-4 bg-picLime text-white font-bold py-2 px-4 rounded hover:bg-picOrange">Contact Us</Link>
      </section>
    </div>
  );
}
