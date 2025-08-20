import React from "react";

export default function OurExperiences() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-picBlue mt-6">Our Experiences</h2>
      <p className="text-center mt-2">Our consultants have delivered assignments across Africa, the Middle East, and Asia.</p>

      <div className="mt-6 bg-white rounded shadow p-6">
        <h4 className="font-bold">Recent Assignments</h4>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <article className="p-4 border rounded">
            <h5 className="font-semibold">Market and Social Research</h5>
            <p className="mt-2">Data-driven insights to support impactful programming.</p>
          </article>
          <article className="p-4 border rounded">
            <h5 className="font-semibold">Policy Development</h5>
            <p className="mt-2">Crafting evidence-based policies that drive sustainable solutions.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
