// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const currency = import.meta.env.VITE_CURRENCY;

//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [searchQuery, setsearchQuery] = useState({});

//   // Fetch seller Status
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get("/api/seller/is-auth");
//       if (data.success) {
//         setIsSeller(true);
//       } else {
//         setIsSeller(false);
//       }
//     } catch (error) {
//       setIsSeller(false);
//     }
//   };

//   // fetch user auth status , user data and card items

//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/is-auth");
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cartItems);
//       }
//     } catch (error) {
//       setUser(null);
//     }
//   };
//   // fetch all products
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Add product to cart

//   const addToCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }
//     setCartItems(cartData);
//     toast.success("Added to Cart");
//   };

//   //Update Cart Item quantity

//   const updateCartItem = (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Cart Updated");
//   };

//   //Remove product from Cart
//   const removeFromCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] === 0) {
//         delete cartData[itemId];
//       }
//     }
//     toast.success("Removed from Cart");
//     setCartItems(cartData);
//   };

//   //updating cart item count

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const item in cartItems) {
//       totalCount += cartItems[item];
//     }
//     return totalCount;
//   };

//   //Get Cart Total Amount

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       if (cartItems[items] > 0) {
//         totalAmount += itemInfo.offerPrice * cartItems[items];
//       }
//     }
//     return Math.floor(totalAmount * 100) / 100;
//   };

//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//     fetchUser();
//   }, []);

//   // update Database cart items
//   useEffect(() => {
//     const updateCart = async () => {
//       try {
//         const { data } = await axios.post("/api/cart/update", { cartItems });
//         if (!data.success) {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//     if (user) {
//       updateCart();
//     }
//   }, [cartItems]);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     showUserLogin,
//     setShowUserLogin,
//     products,
//     currency,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     cartItems,
//     searchQuery,
//     setsearchQuery,
//     getCartAmount,
//     getCartCount,
//     axios,
//     fetchProducts,
//     setCartItems,
//   };
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// 🔹 Axios interceptor to automatically send token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setsearchQuery] = useState({});

  // ---------------- Fetch seller status ----------------
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // ---------------- Fetch user data ----------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // ---------------- Fetch products ----------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------------- Cart Operations ----------------
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Removed from Cart");
    }
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += product.offerPrice * cartItems[id];
    }
    return Math.floor(total * 100) / 100;
  };

  // ---------------- Update cart in database ----------------
  useEffect(() => {
    if (!user) return;
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    updateCart();
  }, [cartItems, user]);

  // ---------------- Load initial data ----------------
  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    setCartItems,
    searchQuery,
    setsearchQuery,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
