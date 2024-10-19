import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type props = {
  entity:string
}

const NoDataInTheTable = (props:props) => {
  return (
    <div className="md:shadow-custom text-lg  font-shopify1000 border w-full md:h-[7cm] h-[30%vh] space-x-3 flex justify-center items-center border-gray-400 bg-white md:rounded-xl">
      <ExclamationCircleIcon className="h-10"/>
      <h1>No {props.entity} found</h1>
    </div>
  );
};

export default NoDataInTheTable;
