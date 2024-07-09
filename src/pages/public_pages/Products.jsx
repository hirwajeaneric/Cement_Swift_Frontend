import { useEffect, useState } from "react"
import { productTypes } from "../../utils/ProductData";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productTypes);
  }, [])

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full flex-col gap-2 max-w-screen-xl text-black justify-between items-start px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
        <h1 className="text-3xl">Products</h1>
        <p>Explore different types of cement that we produce and provide to our customers</p>
        <div className="flex justify-between w-full items-start mt-6 mb-6 flex-wrap">
          {
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Products