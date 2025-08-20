import React from "react";

export default function GetInTouch() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mt-6">Get In Touch</h1>
      <p className="mt-2">We would be happy to know more about your needs. Reach out today.</p>

      <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Message</label>
          <textarea className="mt-1 block w-full border rounded px-3 py-2" rows="5" required />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-picLime hover:bg-picOrange text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
}
