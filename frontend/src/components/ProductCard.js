import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const nav = useNavigate();

  const lowestPrice = Math.min(...product.stores.map((s) => s.price));
  const bestStore = product.stores.find((s) => s.price === lowestPrice);

  return (
    <div className="card" onClick={() => nav("/product/" + encodeURIComponent(product.name))}>
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p className="ratingText">⭐ {product.rating} / 5</p>
      <p className="reviewText">{product.reviews} reviews</p>

      <div className="priceBox">From ₹{lowestPrice}</div>
      <p className="bestDealText">Best deal on {bestStore.site}</p>

      <button className="primaryBtn">View Details</button>
    </div>
  );
}

export default ProductCard;