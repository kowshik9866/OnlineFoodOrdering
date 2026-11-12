
import { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
const [orderPlaced, setOrderPlaced] = useState(false);
const [orderTotal, setOrderTotal] = useState(0);

  // Food details
  const foods = [
    { id: 1, name: 'Chicken Biryani', price: 180, category: 'Biryani', emoji: '🍛', rating: '4.8' },
    { id: 2, name: 'Cheese Pizza', price: 250, category: 'Pizza', emoji: '🍕', rating: '4.7' },
    { id: 3, name: 'Veg Burger', price: 120, category: 'Burger', emoji: '🍔', rating: '4.5' },
    { id: 4, name: 'French Fries', price: 90, category: 'Snacks', emoji: '🍟', rating: '4.4' },
    { id: 5, name: 'Chicken Burger', price: 160, category: 'Burger', emoji: '🍔', rating: '4.6' },
    { id: 6, name: 'Veg Biryani', price: 150, category: 'Biryani', emoji: '🍚', rating: '4.5' }
  ];

  // Add food to cart
  const addToCart = (food) => {
    const existingItem = cart.find((item) => item.id === food.id);

    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  // Remove food completely
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate cart information
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  // Search and category filtering
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">
        <h2 className="logo">🍴 Foodie Express</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Cart ({cartCount})
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div>
          <h1>Delicious Food, Delivered Fast!</h1>
          <p>
            Order your favourite food from the best restaurants
            and enjoy it at your doorstep.
          </p>
          <a href="#menu" className="order-button">
            Order Now
          </a>
        </div>

        <div className="hero-food">🍕</div>
      </section>

      {/* Categories */}
      <section className="categories" id="menu">
        <h2>Explore Categories</h2>

        <div className="category-list">
          {['All', 'Biryani', 'Pizza', 'Burger', 'Snacks'].map((item) => (
            <button
              key={item}
              className={category === item ? 'category active' : 'category'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search your favourite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Food Menu */}
      <section className="food-section">
        <h2>Popular Food Items</h2>

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <div className="food-card" key={food.id}>
              <div className="food-image">{food.emoji}</div>

              <div className="food-details">
                <h3>{food.name}</h3>
                <p>⭐ {food.rating} Rating</p>

                <div className="food-bottom">
                  <strong>₹{food.price}</strong>

                  <button onClick={() => addToCart(food)}>
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <p className="no-food">No food items found.</p>
        )}
      </section>

      {/* Shopping Cart */}
      {showCart && (
        <section className="cart-section">
          <h2>🛒 Your Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Add some delicious food!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-food">
                    <span className="cart-emoji">{item.emoji}</span>
                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price} per item</p>
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>

                    <strong>{item.quantity}</strong>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>

                  <strong className="item-total">
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-summary">
                <h3>Total Amount: ₹{cartTotal}</h3>
                <p>Total Items: {cartCount}</p>
               <button
  className="checkout-button"
  onClick={() => setShowCheckout(true)}
>
  Proceed to Checkout
</button>
              </div>
            </>
          )}

          <button
            className="close-cart"
            onClick={() => setShowCart(false)}
          >
            Close Cart
          </button>
        </section>
      )}
      
{/* Checkout Form */}
{showCheckout && (
  <section className="checkout-section">

    <h2>🛍️ Customer Checkout</h2>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        setOrderTotal(cartTotal);
        setOrderPlaced(true);
        setCart([]);
        setShowCart(false);
        setShowCheckout(false);
      }}
      className="checkout-form"
    >

      <label>Customer Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        required
      />

      <label>Mobile Number</label>
      <input
        type="tel"
        placeholder="Enter 10 digit mobile number"
        pattern="[0-9]{10}"
        required
      />

      <label>Delivery Address</label>
      <textarea
        placeholder="Enter your complete address"
        required
      />

      <label>Payment Method</label>
      <select required>
        <option value="">Select payment method</option>
        <option value="COD">Cash on Delivery</option>
      </select>

      <h3>Total Amount: ₹{cartTotal}</h3>

      <button type="submit" className="place-order-button">
        Place Order
      </button>

    </form>
  </section>
)}

{/* Order Success Message */}
{orderPlaced && (
  <section className="success-section">
    <h1>🎉 Order Placed Successfully!</h1>
    <p>Thank you for ordering from Foodie Express.</p>
    <h2>Total Amount: ₹{orderTotal}</h2>

    <button
      className="checkout-button"
      onClick={() => setOrderPlaced(false)}
    >
      Continue Shopping
    </button>
  </section>
)}

      {/* Footer */}
      <footer id="about">
        <h3>🍴 Foodie Express</h3>
        <p>Good Food. Good Mood. Fast Delivery.</p>
        <p>© 2026 Foodie Express. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
