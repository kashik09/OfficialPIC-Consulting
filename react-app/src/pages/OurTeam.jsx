import React from "react";

export default function OurTeam() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-picBlue mt-6">Our Team</h2>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="p-4 border rounded">
          <h5 className="font-bold">Moses Lusih</h5>
          <p className="text-sm text-gray-600">Lead Consultant</p>
          <p className="mt-2">Moses has led numerous evaluations and assessments across Africa...</p>
        </div>
        <div className="p-4 border rounded">
          <h5 className="font-bold">Betty Kweyu</h5>
          <p className="text-sm text-gray-600">Senior Program Evaluator</p>
          <p className="mt-2">Betty has co-led various projects focusing on youth development...</p>
        </div>
      </div>
    </div>
  );
}
