import {
  faMinus,
  faCartArrowDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({
  product,
  itemInCart,
  handleAddToCart,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-green-500/20 hover:border-green-500 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold text-green-400 mb-1">
            {product.name}
          </h2>
          <p className="text-sm text-gray-400 mb-2">{product.category}</p>
          <p className="text-lg font-semibold text-pink-400">
            ${product.price.toFixed(2)}
          </p>
          <p
            className={`text-sm mt-1 ${
              product.inStock ? "text-green-300" : "text-red-500"
            }`}
          >
            {product.inStock ? "Ready for Battle" : "Out of Stock"}
          </p>
        </div>

        {itemInCart ? (
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleDecrement}
              className="text-black bg-green-500 p-2 rounded-full w-10 h-10"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className="text-xl font-bold text-white">
              {itemInCart.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="text-black bg-green-500 p-2 rounded-full w-10 h-10"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        ) : (
          <button
            className={`mt-6 w-full px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-md transition-all duration-300 ${
              product.inStock
                ? "bg-green-500 hover:bg-green-600 text-black shadow-lg hover:shadow-green-500/50"
                : "bg-gray-600 cursor-not-allowed text-gray-300"
            }`}
            disabled={!product.inStock}
            onClick={() => handleAddToCart(product)}
          >
            <FontAwesomeIcon icon={faCartArrowDown} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
