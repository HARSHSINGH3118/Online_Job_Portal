// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  // Featured Jobs Carousel Data
  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      description: "Join our innovative team",
      location: "Remote",
      salary: "$80k",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "CodeWorks",
      description: "Work on cutting-edge systems",
      location: "New York",
      salary: "$90k",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignPro",
      description: "Create intuitive interfaces",
      location: "San Francisco",
      salary: "$85k",
    },
  ];
  const [jobIndex, setJobIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setJobIndex((prevIndex) => (prevIndex + 1) % featuredJobs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredJobs.length]);

  // Testimonials Carousel Data
  const testimonials = [
    { id: 1, text: "This portal transformed my career!", author: "Alice" },
    {
      id: 2,
      text: "A seamless experience from start to finish.",
      author: "Bob",
    },
    { id: 3, text: "I found the perfect candidate quickly.", author: "Carol" },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Animated Stat Counters (Hard-coded)
  const [jobsCount, setJobsCount] = useState(0);
  const [employersCount, setEmployersCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  useEffect(() => {
    const targetJobs = 125;
    const targetEmployers = 42;
    const targetApplications = 950;
    let startJobs = 0,
      startEmployers = 0,
      startApplications = 0;
    const duration = 2000; // ms
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const incJobs = targetJobs / steps;
    const incEmployers = targetEmployers / steps;
    const incApplications = targetApplications / steps;
    const counter = setInterval(() => {
      startJobs += incJobs;
      startEmployers += incEmployers;
      startApplications += incApplications;
      setJobsCount(Math.ceil(startJobs));
      setEmployersCount(Math.ceil(startEmployers));
      setApplicationsCount(Math.ceil(startApplications));
      if (
        startJobs >= targetJobs &&
        startEmployers >= targetEmployers &&
        startApplications >= targetApplications
      ) {
        clearInterval(counter);
      }
    }, intervalTime);
    return () => clearInterval(counter);
  }, []);

  // CTA Modal (Appears after delay)
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
      {/* Enhanced SVG Background with Multiple Rings */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Outer ring */}
        <circle
          cx="600"
          cy="400"
          r="350"
          fill="none"
          stroke="#d4dae7"
          strokeOpacity="0.3"
          strokeWidth="4"
        />
        {/* Middle ring */}
        <circle
          cx="600"
          cy="400"
          r="250"
          fill="none"
          stroke="#c0c5d1"
          strokeOpacity="0.3"
          strokeWidth="3"
        />
        {/* Inner ring */}
        <circle
          cx="600"
          cy="400"
          r="150"
          fill="none"
          stroke="#a3a9b9"
          strokeOpacity="0.3"
          strokeWidth="2"
        />
        {/* Additional decorative rings */}
        <circle
          cx="300"
          cy="200"
          r="80"
          fill="none"
          stroke="#d4dae7"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <circle
          cx="900"
          cy="600"
          r="100"
          fill="none"
          stroke="#d4dae7"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </svg>

      {/* Hero Section (placed over SVG) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Our Job Portal
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-sm">
          Connecting talent with opportunity in a subtle, professional space.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block bg-transparent border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-100 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Featured Jobs Carousel */}
        <section className="py-12 bg-white/90">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Featured Jobs</h2>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg inline-block transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white">
                {featuredJobs[jobIndex].title}
              </h3>
              <p className="text-md text-blue-200 mt-2">
                {featuredJobs[jobIndex].company}
              </p>
              <p className="text-sm text-blue-100 mt-2">
                {featuredJobs[jobIndex].description}
              </p>
              <p className="text-sm text-blue-100 mt-1">
                {featuredJobs[jobIndex].location} |{" "}
                {featuredJobs[jobIndex].salary}
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md inline-block transition-opacity">
              <p className="italic text-gray-300">
                "{testimonials[testimonialIndex].text}"
              </p>
              <p className="mt-4 font-semibold text-gray-100">
                - {testimonials[testimonialIndex].author}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl shadow-lg text-white">
              <p className="text-3xl font-bold">{jobsCount}</p>
              <p className="text-sm uppercase">Jobs Posted</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-green-600 to-teal-700 rounded-xl shadow-lg text-white">
              <p className="text-3xl font-bold">{employersCount}</p>
              <p className="text-sm uppercase">Employers</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl shadow-lg text-white">
              <p className="text-3xl font-bold">{applicationsCount}</p>
              <p className="text-sm uppercase">Applications</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <div className="mb-4 text-5xl">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
                <p className="text-gray-600">
                  Easily browse and filter job listings to find your perfect
                  match.
                </p>
              </div>
              <div className="text-center p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <div className="mb-4 text-5xl">📝</div>
                <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                <p className="text-gray-600">
                  Submit your resume and cover letter with a few simple clicks.
                </p>
              </div>
              <div className="text-center p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <div className="mb-4 text-5xl">💼</div>
                <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
                <p className="text-gray-600">
                  Receive interview calls and land your dream job with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="py-12 bg-white/90">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Find Your Next Opportunity
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full md:w-1/2 border border-gray-300 p-3 rounded"
              />
              <select className="w-full md:w-1/4 border border-gray-300 p-3 rounded">
                <option value="">All Locations</option>
                <option value="remote">Remote</option>
                <option value="new-york">New York</option>
                <option value="san-francisco">San Francisco</option>
              </select>
              <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Career Resources Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Career Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Resume Tips</h3>
                <p className="text-gray-600 text-sm">
                  Learn how to craft the perfect resume.
                </p>
              </div>
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Interview Prep</h3>
                <p className="text-gray-600 text-sm">
                  Get ready for your interview with expert advice.
                </p>
              </div>
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                <p className="text-gray-600 text-sm">
                  Explore resources for long-term career development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Upcoming Events & Job Fairs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Virtual Job Fair</h3>
                <p className="text-gray-600 text-sm">
                  Join our virtual event on March 15 to meet top employers.
                </p>
                <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                  Register
                </button>
              </div>
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">
                  In-Person Career Expo
                </h3>
                <p className="text-gray-600 text-sm">
                  Attend our expo in San Francisco on April 5 for networking and
                  interviews.
                </p>
                <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                  Register
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media / Blog Highlights */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Latest News & Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">
                  Job Portal Launch
                </h3>
                <p className="text-gray-600 text-sm">
                  Our new platform is live! Discover exciting opportunities
                  today.
                </p>
              </div>
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Career Advice</h3>
                <p className="text-gray-600 text-sm">
                  Tips and strategies to enhance your career growth.
                </p>
              </div>
              <div className="p-6 border rounded-xl hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Industry Trends</h3>
                <p className="text-gray-600 text-sm">
                  Stay updated on the latest trends in your industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
              <h3 className="text-xl font-bold mb-4">Join Our Community!</h3>
              <p className="mb-4">
                Sign up now to get personalized job recommendations and more.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/register"
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  Register
                </Link>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 transition"
        onClick={() => alert("Chat functionality coming soon!")}
      >
        💬
      </button>
    </div>
  );
}

export default Home;
