import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";


const ErrorInTheTable = () => {
  return (
    <div className="md:shadow-custom border w-full md:h-[7cm] h-[30%vh] font-shopify1000 text-lg space-x-3 flex justify-center items-center border-gray-400 bg-white md:rounded-xl">
            <ExclamationTriangleIcon className="h-10"/>
      <h1>An Error Occured</h1>
    </div>
  );
};

export default ErrorInTheTable;
