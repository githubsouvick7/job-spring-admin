"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Welcome Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Admin Dashboard
        </h1>
        <p className="mt-4 text-gray-600">
          Empowering job seekers to find their dream opportunities. Together, we
          create a world of possibilities.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
        <p className="mt-4 text-gray-600">
          At jobspring, we aim to connect talent with opportunity, helping job
          seekers achieve their professional aspirations while enabling
          companies to build exceptional teams.
        </p>
      </section>

      {/* Key Metrics */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Platform at a Glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800">5,234</h3>
            <p className="text-gray-600">Jobs Posted</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800">12,876</h3>
            <p className="text-gray-600">Applications Submitted</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800">8,652</h3>
            <p className="text-gray-600">Registered Users</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800">350+</h3>
            <p className="text-gray-600">Partner Companies</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Post a New Job
          </button>
          <button className="w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
            Review Applications
          </button>
          <button className="w-full py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
            Approve Recruiter Accounts
          </button>
          <button className="w-full py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
            Moderate Content
          </button>
        </div>
      </section>
    </div>
  );
}
