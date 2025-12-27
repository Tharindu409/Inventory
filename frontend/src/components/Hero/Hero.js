 import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SlideRight } from '../../utils/animation';
import heroBackground from '../../assets/xxxx.jpg';
 
const Hero = () => {
  return (
    <div
      className="relative w-full min-h-[650px] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 md:py-24"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Brand Info */}
      <div className="relative z-10 flex flex-col justify-center py-16 md:py-0 md:pr-16 xl:pr-40 text-center md:text-left space-y-6">
        <motion.p
          variants={SlideRight(0.2)}
          initial="hidden"
          animate="visible"
          className="text-red-500 uppercase tracking-wide font-semibold text-lg"
        >
          Inventory Management Made Easy
        </motion.p>

        <motion.h1
          variants={SlideRight(0.4)}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Welcome to <span className="text-green-500">Area52</span>
        </motion.h1>

        <motion.p
          variants={SlideRight(0.6)}
          initial="hidden"
          animate="visible"
          className="text-white text-base sm:text-lg max-w-xl mx-auto md:mx-0"
        >
          Your ultimate solution for{' '}
          <span className="text-green-500 font-semibold">
            efficient inventory management
          </span>{' '}
          — track stock, manage suppliers, and grow smarter.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={SlideRight(0.8)}
          initial="hidden"
          animate="visible"
          className="flex gap-8 justify-center md:justify-start mt-8 items-center"
        >
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition">
            Get Started
          </button>

          <button className="flex justify-center items-center gap-2 font-semibold text-white hover:text-green-500 transition">
            <span className="w-10 h-10 bg-green-100 rounded-full flex justify-center items-center">
              <FaPlay className="text-green-500" />
            </span>
            See how it works
          </button>
        </motion.div>
      </div>

       
       
    </div>
  );
};

export default Hero;