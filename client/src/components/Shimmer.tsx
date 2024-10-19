
const Shimmer = () => {
  return (
    <div className="md:shadow-custom border w-full md:h-[7cm] h-[30vh] flex flex-col justify-center items-start border-gray-400 bg-white md:rounded-xl space-y-4 p-4">
      {Array(3).fill("").map((_, index) => (
        <div 
          key={index} 
          className="animate-pulse w-[90%] h-7 bg-gray-300 rounded-md"
          style={{ width: `${90 - index * 10}%` }} 
        ></div>
      ))}
    </div>
  );
};

export default Shimmer;

