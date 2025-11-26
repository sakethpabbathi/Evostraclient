// import './App.css';
// import 'swiper/css';

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function LandingPage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products')
//       .then(res => setProducts(res.data))
//       .catch(err => console.error(err));
//   }, []);

// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   fetchProducts();
// }, [products]);


//   return (
//     <div className="landing-page">
      


//       {/* Sample Products Section */}
//       <section className="products">
//         <h2>Sample Products</h2>
//         <div className="product-grid">
//           {products.map(product => (
//             <div key={product.id} className="product-card">
//               <img src= {product.image} alt={product.name} />
//               {/* <img src={`http://localhost:5000${product.image}`} alt={product.name} /> */}

//               <h4>{product.name}</h4>
//               <p>₹{product.price}</p>
//             </div>
//           ))}
//         </div>
//       </section>

     
//     </div>
//   );
// }

// export default LandingPage;


// LandingPage.js (Corrected)

import './App.css';
import 'swiper/css';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

function LandingPage() {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // <--- Use an empty dependency array to fetch only on mount.

  return (
    <div className="landing-page">
      {/* ... other components ... */}
      
      {/* Sample Products Section */}
      <section className="products">
        <h2>Sample Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {/* Ensure the image source is correct. It should be the absolute URL from the database. 
                  Your backend already stores the full URL, so: */}
              <img src={product.image} alt={product.name} /> 
              {/* If the image column only stored the filename, you would use:
              <img src={`http://localhost:5000/uploads/${product.image_filename}`} alt={product.name} /> 
              But based on your backend, `product.image` contains the full URL. */}

              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;