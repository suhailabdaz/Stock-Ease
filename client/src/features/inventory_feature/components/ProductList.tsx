import { useNavigate } from "react-router-dom"

const ProductList = () => {


  const navigate = useNavigate()
  return (
    <div>
      <div className="w-[100%] mb-6 flex justify-between">
      <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
            Products
          </h1>
          <button
        onClick={() => navigate('/products/add-product')}
        className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom  py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
          >
            Add Product
          </button>
          </div>
      
    </div>
  )
}

export default ProductList