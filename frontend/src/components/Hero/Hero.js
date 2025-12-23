import React from 'react'
import heroImage from '../../assets/invent.jpg'
import { FaPlay } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 
  min-h-[650px] items-center gap-12 px-6 relative">

  {/* Brand Info */}
  <div className="flex flex-col justify-center py-16 md:py-0 md:pr-16 xl:pr-40">
    <div className="text-center md:text-left space-y-6">

      <p className="text-orange-500 uppercase tracking-wide font-semibold text-sm">
        100% Satisfaction Guaranteed
      </p>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        Welcome to{" "}
        <span className="text-green-500">InventorySys</span>
      </h1>

      <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
        Your ultimate solution for{" "}
        <span className="text-primary font-semibold">
          efficient inventory management
        </span>{" "}
        — track stock, manage suppliers, and grow smarter.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition">
          Get Started
        </button>

        <button>
            <span className='w-10 h-10 bg-secondary/15'>
                <FaPlay className="inline-block mr-2 text-green-500"/>
            </span>
          See how it works
        </button>
      </div>

    </div>
  </div>

  {/* Image Section */}
  <div className="flex justify-center md:justify-end">
    <img
      src={heroImage}
      alt="Inventory Management"
      className="w-full max-w-md md:max-w-lg drop-shadow-lg"
    />
  </div>
    </div>
  )
}

export default Hero
