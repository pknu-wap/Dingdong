import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';


const Mypage = () => {
  const [selectedTab, setSelectedTab] = useState('salesHistory');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Tabs selectedTab={selectedTab} onTabClick={handleTabClick} />
      <TabContent selectedTab={selectedTab} />
    </div>
  );
};

const Tabs = ({ selectedTab, onTabClick }) => {
  return (
    <div>
      <button onClick={() => onTabClick('salesHistory')}>판매 내역</button>
      <button onClick={() => onTabClick('wishlist')}>찜한 목록</button>
    </div>
  );
};

const TabContent = ({ selectedTab }) => {
  if (selectedTab === 'salesHistory') {
    return <SalesHistory />;
  } else if (selectedTab === 'wishlist') {
    return <Wishlist />;
  }
  return null;
};

const SalesHistory = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/mypage/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.productsResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [token]);

  if (!token) return <div>Please log in to see your sales history.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>판매 내역</h2>
      <ul>
        {products.map((item) => (
          <li key={item.productId}>
            {item.title} - {item.price}원
          </li>
        ))}
      </ul>
    </div>
  );
};

const Wishlist = () => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/mypage/likes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data.productsResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFavorites();
    }
  }, [token]);

  if (!token) return <div>Please log in to see your wishlist.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>찜한 목록</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.productId}>
            {item.title} - {item.price}원
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mypage;
