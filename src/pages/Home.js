import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const query = (searchParams.get("q") || "").toLowerCase();

  const getCategory = (name) => {
    if (["iPhone 15", "Samsung S23"].includes(name)) return "Smartphones";
    if (["MacBook Air M2", "Dell XPS 13"].includes(name)) return "Laptops";
    if (["Sony Headphones", "Logitech Mouse", "Gaming Keyboard"].includes(name))
      return "Accessories";
    if (["iPad Air", "Canon DSLR"].includes(name)) return "Tablets";
    if (["Apple Watch"].includes(name)) return "Wearables";
    return "Other";
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "All" || getCategory(p.name) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="homeLayout">
      <aside className="dashboardSidebar">
        <h2>Dashboard</h2>

        <ul>
          <li
            className={selectedCategory === "All" ? "activeSidebarItem" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            🏠 Home
          </li>
          <li
            className={
              selectedCategory === "Smartphones" ? "activeSidebarItem" : ""
            }
            onClick={() => setSelectedCategory("Smartphones")}
          >
            📱 Smartphones
          </li>
          <li
            className={
              selectedCategory === "Laptops" ? "activeSidebarItem" : ""
            }
            onClick={() => setSelectedCategory("Laptops")}
          >
            💻 Laptops
          </li>
          <li
            className={
              selectedCategory === "Accessories" ? "activeSidebarItem" : ""
            }
            onClick={() => setSelectedCategory("Accessories")}
          >
            🎧 Accessories
          </li>
          <li
            className={
              selectedCategory === "Tablets" ? "activeSidebarItem" : ""
            }
            onClick={() => setSelectedCategory("Tablets")}
          >
            🧮 Tablets
          </li>
          <li
            className={
              selectedCategory === "Wearables" ? "activeSidebarItem" : ""
            }
            onClick={() => setSelectedCategory("Wearables")}
          >
            ⌚ Wearables
          </li>
          <li>🛒 Cart</li>
        </ul>
      </aside>

      <div className="homeContent">
        <div className="heroSection">
          <h1>Purchase Smartly</h1>
          <p>
            Make smarter buying decisions by comparing prices across Amazon,
            Flipkart, and Croma with trusted ratings and deal insights.
          </p>
        </div>

        <div className="sectionHeader">
          <h2>
            {query
              ? `Search Results for "${query}"`
              : selectedCategory === "All"
                ? "Top Products"
                : selectedCategory}
          </h2>
          <span>{filteredProducts.length} products</span>
        </div>

        <div className="grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p, i) => <ProductCard product={p} key={i} />)
          ) : (
            <div className="emptyState">
              <h3>No products found</h3>
              <p>
                Try searching for iPhone, Samsung, MacBook, iPad, Canon, etc.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
