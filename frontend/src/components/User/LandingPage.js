import { motion } from "framer-motion";
 


const LandingPage = () => {
  return (
    <>
   

      <section className="bg-white dark:bg-slate-900 min-h-screen text-center px-6 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl font-semibold text-black dark:text-white"
        >
          Browse everything.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mt-24"
        >
          {/* Green background */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-green-200 dark:bg-green-900 rounded-t-[3rem] -z-10"></div>

          <motion.img
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="Dashboard Preview"
            className="mx-auto rounded-2xl shadow-2xl w-[90%] md:w-[70%]"
          />
        </motion.div>
      </section>

     </>
  );
};

export default LandingPage;
