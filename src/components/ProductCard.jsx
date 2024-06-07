/* eslint-disable react/prop-types */
const ProductCard = ({product}) => {
    return (
        <a href={`product/${product.name}`} className="group block md:w-1/5">
            <img src={product.photo} alt="" className="h-60 w-full rounded object-cover" />
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