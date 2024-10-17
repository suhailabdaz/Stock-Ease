import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className=" relative flex md:w-[90vw] justify-end ">
      <div className="w-1/2 h-full bg-white md:bg-gradient-to-b from-gradWhite via-startPurple to-gradWhite"></div>
      <div className="w-1/2 h-full bg-white md:bg-gradient-to-b from-gradWhite via-startGreen to-gradWhite"></div>
      <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
      key="add-customer"
      initial={{ x: '2%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-2%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
        <div>
        <div className="w-[100%] mb-6  space-y-2">
        <h1 className="font-shopify1000 font-bold text-gray-700 text-2xl">
          Welcome to Stock Ease !!
        </h1>
        <h3 className="font-shopify  text-gray-700 text-md">
Making Commerce Easy for everyone.   
     </h3>
       
      </div>
              <div className="h-[10cm]  transition-all delay-300 duration-300 w-[100%]  md:w-[20cm] md:shadow-custom  bg-white py-10 px-8 md:rounded-xl"></div>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
