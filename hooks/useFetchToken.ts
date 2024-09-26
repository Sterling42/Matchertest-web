// hooks/useFetchToken.ts
import { useState, useEffect } from 'react';
import { Token } from '../pages/api/interface/game';

const useFetchToken = () => {
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/randomToken');
      const data = await response.json();
      const newToken = {
        name: data.name,
        symbol: data.symbol,
        logoURI: data.logoURI,
        address: data.address,
      };
      setToken(newToken);
      localStorage.setItem('currentToken', JSON.stringify(newToken));
    } catch (error) {
      console.error('Error fetching token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('currentToken');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      setLoading(false);
    } else {
      fetchToken();
    }
  }, []);

  const resetToken = () => {
    fetchToken();
  };

  return { token, loading, resetToken };
};

export default useFetchToken;