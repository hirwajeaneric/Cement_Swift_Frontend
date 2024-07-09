/* eslint-disable react/prop-types */
const ProductCard = ({product}) => {
    return (
        <a href={`/product/${product.name}`} className="flex flex-col md:w-[19%] mb-3 bg-slate h-max">
            <img src={product.photo} alt="" className="w-full rounded object-contain" />
            <div className="mt-3">
                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-700">{product.price} Rwf</p>
            </div>
        </a>
    )
}

export default ProductCard