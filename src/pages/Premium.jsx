/* eslint-disable no-unused-vars */
import React from 'react'
import { CheckCircle, Star } from 'lucide-react'

const Premium = () => {
  return (
    <div>
      {/* Pricing Section */}
      <div className="mx-auto pt-[120px] max-w-7xl overflow-hidden p-6 relative text-white bg-black md:my-24 lg:my-32">
      <div className="absolute overflow-hidden -right-[5rem] w-64 h-64 rounded-full bg-radial-gradient from-red to-transparent blur-[80px] pointer-events-none"></div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          {/* Left Section */}
          <div className="px-4 py-10 z-10 lg:col-span-5 lg:px-0">
            <span className="mb-8 inline-block rounded-full bg-black border-2 border-white px-3 py-1 text-xs font-semibold">
              Start Your Musical Journey
            </span>
            <h1 className="text-3xl font-extrabold md:text-5xl">
              Explore Premium Features
            </h1>
            <p className="mt-8 text-sm font-medium">
              Get access to exclusive songs, playlists, and coaching tools. Let Muzistic accompany you in every rhythm and beat. Join the premium community today and elevate your musical experience.
            </p>

            <div className="mt-8 flex w-full max-w-sm items-center space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-red bg-black px-3 py-2 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red"
                type="email"
                placeholder="Enter your email"
              ></input>
              <button
                type="button"
                className="rounded-md bg-black border-2 border-red text-red px-3 py-2 text-sm font-semibold  shadow-md hover:bg-red hover:text-white focus:ring-2 focus:ring-red "
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center justify-center md:flex-row lg:col-span-7">
            {/* Basic Plan */}
            <div className="w-full p-5 md:w-1/2">
            <div className="absolute -left-[5rem] w-64 h-64 rounded-full bg-radial-gradient from-red to-transparent blur-[90px]"></div>
              <div className="rounded-lg border-2 border-red bg-traparent">
                <div className="border-b border-red">
                  <div className="px-6 py-6">
                    <h3 className="mb-3 text-xl font-bold text-white">Basic Plan</h3>
                    <p className="text-sm font-medium text-gray-300">
                      Essential tools to start your journey.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <p className="mb-4 text-sm font-medium text-gray-400">Features included:</p>
                  <ul className="mb-6 text-sm font-medium text-white">
                    <li className="mb-2 flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Access to exclusive playlists
                    </li>
                    <li className="mb-2 flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Personalized recommendations
                    </li>
                    <li className="mb-2 flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Ad-free experience
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Weekly updates
                    </li>
                  </ul>
                  <p className="text-lg font-bold text-white">
                    Starting from <span className="text-2xl">$5.99/mo</span>
                  </p>
                  <button
                    type="button"
                    className="mt-4 w-full border-2 rounded-md bg-transparent border-red px-4 py-2 text-sm font-semibold text-red shadow-md hover:bg-red hover:text-white"
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="w-full p-5 md:w-1/2 overflow-hidden">
            <div className="absolute overflow-hidden overflow-x-hidden -right-[5rem] w-64 h-64 rounded-full bg-radial-gradient from-red to-transparent blur-[90px]"></div>

              <div className="rounded-lg border-2 border-red bg-black">
                <div className="border-b-2 border-red">
                  <div className="px-6 py-6">
                    <h3 className="mb-3 text-xl font-bold text-white">Standard Plan</h3>
                    <p className="text-sm font-medium text-gray-300">
                      Advanced tools to enhance your experience.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <p className="mb-4 text-sm font-medium text-gray-400">Features included:</p>
                  <ul className="mb-6 text-sm font-medium text-white">
                    <li className="mb-2 flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Unlimited downloads
                    </li>
                    <li className="mb-2 flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Priority customer support
                    </li>
                    <li className="mb-2 flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Exclusive live sessions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-green-400" size={16} />
                      Personalized coaching
                    </li>
                  </ul>
                  <p className="text-lg font-bold text-white">
                    Starting from <span className="text-2xl">$15.99/mo</span>
                  </p>
                  <button
                    type="button"
                    className="mt-4 w-full border-2 rounded-md bg-transparent border-red px-4 py-2 text-sm font-semibold text-red shadow-md hover:bg-red hover:text-white"
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premium