import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductPage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const product = products.find((p) => p.name === decodedName);

  if (!product) {
    return (
      <div className="productPage">
        <h1>Product not found</h1>
      </div>
    );
  }

  const prices = product.stores.map((s) => s.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const bestStore = product.stores.find((s) => s.price === lowestPrice);
  const savings = highestPrice - lowestPrice;

  return (
    <div className="productPage">

      {/* TOP SECTION */}
      <div className="productHero">

        <div className="productImageBox">
          <img
            src={product.image}
            alt={product.name}
            className="productMainImage"
          />
        </div>

        <div className="productInfoBox">
          <h1>{product.name}</h1>
          <h3>⭐ {product.rating} / 5</h3>
          <p className="reviewCount">{product.reviews} customer reviews</p>

          <div className="bestDealBox">
            <h2>Best Deal: {bestStore.site}</h2>
            <p className="bestPrice">₹{lowestPrice}</p>
            <p className="saveText">
              You save ₹{savings} compared to highest price
            </p>
          </div>

          {/* BUTTONS */}
          <div className="productActionButtons">
            <button
              className="buyNowBtn"
              onClick={() => window.open(bestStore.link, "_blank")}
            >
              Buy Now
            </button>

            <button
              className="addToCartBtn"
              onClick={() => alert(product.name + " added to cart")}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>

      {/* COMPARISON SECTION */}
      <div className="comparisonSection">
        <h2>Price Comparison</h2>

        <div className="comparisonTable">

          {/* HEADER */}
          <div className="comparisonHeader">
            <span>Store</span>
            <span>Rating</span>
            <span>Price</span>
            <span>Status</span>
          </div>

          {/* ROWS */}
          {product.stores.map((s, i) => (
            <div className="store" key={i}>

              {/* ONLY CHANGE HERE */}
              <span>{s.site}</span>

              <span>⭐ {s.rating}</span>

              <span>₹{s.price}</span>

              <span className={s.price === lowestPrice ? "dealTag" : "normalTag"}>
                {s.price === lowestPrice ? "Best Deal" : "Available"}
              </span>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default ProductPage;