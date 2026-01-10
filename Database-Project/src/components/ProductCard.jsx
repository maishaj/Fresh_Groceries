import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, cartItems, removeFromCart, navigate } =
    useAppContext();

  if (!product) return null;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="border border-gray-300 rounded-md bg-white w-full overflow-hidden cursor-pointer hover:shadow-md transition flex flex-col"
    >
      {/* Product Image */}
      <div className="flex justify-center items-center p-2 md:p-4">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-36 md:h-44 object-contain transition-transform"
        />
      </div>

      {/* Product Info */}
      <div className="px-2 pb-3 md:px-4 md:pb-4 flex flex-col flex-1">
        {/* Category */}
        <p className="text-gray-500 text-xs md:text-sm mb-1">
          {product.category}
        </p>

        {/* Name */}
        <p className="text-gray-800 font-medium text-sm md:text-lg mb-2 line-clamp-2">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-3.5 md:w-4 h-auto"
                alt="star"
              />
            ))}
          <span className="text-gray-500 text-xs">(4)</span>
        </div>

        {/* Price & Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-auto">
          <p className="text-primary font-medium text-sm md:text-xl">
            {currency}
            {product.offerPrice}
            <span className="line-through text-gray-400 text-xs md:text-base ml-1">
              {currency}
              {product.price}
            </span>
          </p>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-center sm:justify-end"
          >
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 px-2 md:px-4 h-7 md:h-9 rounded text-xs md:text-base"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart" className="w-3 md:w-5" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-1 md:gap-2 bg-primary/25 rounded h-7 md:h-9 px-2 select-none text-sm">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="px-1"
                >
                  -
                </button>
                <span className="w-4 text-center">
                  {cartItems[product._id]}
                </span>
                <button onClick={() => addToCart(product._id)} className="px-1">
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
