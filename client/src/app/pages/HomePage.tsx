const HomePage = () => {
  return (
    <div className=" relative flex md:w-[90vw] justify-end ">
      <div className="w-1/2 h-full bg-white md:bg-gradient-to-b from-gradWhite via-startPurple to-gradWhite"></div>
      <div className="w-1/2 h-full bg-white md:bg-gradient-to-b from-gradWhite via-startGreen to-gradWhite"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div>
        {/* <h1 className="font-shopify1000 font-bold text-xl">Welcome to Stock Ease</h1> */}
        <div className="h-[12cm]  transition-all delay-300 duration-300 w-[100%]  md:w-[20cm] md:shadow-custom  bg-white py-10 px-8 md:rounded-xl"></div>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
