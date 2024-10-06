import React, { useState, useEffect, useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  // State to store the fetched product images for the carousel
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  
  // Fetch product images from Unsplash or Lorem Picsum API
  useEffect(() => {
    async function fetchImages() {
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
      const data = await response.json();
      setImages(data);
      setMainImage(data[0]?.download_url);  // Set the first image as the default main image
    }
    fetchImages();
  }, []);

  // Function to change main image on thumbnail click
  const handleThumbnailClick = (url) => {
    setMainImage(url);
  };

  return (
    <div className='cart'>
      {/* Carousel Section */}
      <div className='carousel'>
        <div className='main-image'>
          <img src={mainImage} alt='Main Product' />
        </div>
        <div className='thumbnails'>
          {images.map((image, index) => (
            <img 
              key={index} 
              src={image.download_url} 
              alt={`Thumbnail ${index}`} 
              onClick={() => handleThumbnailClick(image.download_url)} 
            />
          ))}
        </div>
      </div>

      {/* Product Information Section */}
      <div className='product-info'>
        <h1>Product Name</h1>
        <p>Product Description</p>
        <p>Price: $100</p>
        <label>Quantity:
          <input type="number" min="1" defaultValue="1" />
        </label>
        <button onClick={() => alert('Product added to cart!')}>Add to Cart</button>
      </div>

      {/* Existing Cart Section */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item.food_id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.food_image} alt="" />
                  <p>{item.food_name}</p>
                  <p>${item.food_price}</p>
                  <div>{cartItems[item.food_id]}</div>
                  <p>${item.food_price * cartItems[item.food_id]}</p>
                  <p className='cart-items-remove-icon' onClick={() => removeFromCart(item.food_id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      {/* Cart Totals Section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        {/* Promo Code Section */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
