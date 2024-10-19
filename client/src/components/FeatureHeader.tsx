import { useNavigate } from "react-router-dom"


type Props = {
  entity:string
  feature : string
}

  const FeatureHeader = (props: Props) => {
    const navigate = useNavigate()
  return (
<div className="w-[100%] mb-6 flex justify-between">
        <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
          {props.feature}
        </h1>
        <button
          onClick={() => navigate(`/${props.feature}/add-${props.entity}`)}
          className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
        >
          Add {props.feature}
        </button>
      </div>  )
}

export default FeatureHeader