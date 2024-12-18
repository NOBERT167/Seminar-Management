"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 h-screen flex items-center justify-center">
        <div className="text-center text-white space-y-6 px-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to SeminarPro
          </h1>
          <p className="text-lg md:text-xl">
            Simplify seminar and room management with our easy-to-use platform.
          </p>
          <Button className="bg-white text-indigo-600 hover:bg-gray-200 px-6 py-3 rounded-full">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Seminar Management</h3>
              <p>
                Organize and manage seminars with ease. Track registrations,
                participants, and more.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Room Scheduling</h3>
              <p>
                Manage room resources efficiently and ensure smooth operations
                for your events.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">User Registration</h3>
              <p>
                Allow users to register effortlessly and track their
                participation in seminars.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">120+</h3>
              <p>Seminars Organized</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">50+</h3>
              <p>Rooms Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">1,000+</h3>
              <p>Happy Participants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <p className="italic mb-4">
                "SeminarPro has made managing seminars so much easier for our
                organization. Highly recommended!"
              </p>
              <h3 className="font-bold">- John Doe</h3>
            </Card>
            <Card className="p-6">
              <p className="italic mb-4">
                "The room management feature is a game-changer. We’ve optimized
                our resources like never before."
              </p>
              <h3 className="font-bold">- Jane Smith</h3>
            </Card>
            <Card className="p-6">
              <p className="italic mb-4">
                "A simple yet powerful platform for seminar registration and
                management."
              </p>
              <h3 className="font-bold">- Michael Johnson</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between">
          <p>&copy; 2024 SeminarPro. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400">
              Twitter
            </a>
            <a href="#" className="hover:text-indigo-400">
              LinkedIn
            </a>
            <a href="#" className="hover:text-indigo-400">
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
