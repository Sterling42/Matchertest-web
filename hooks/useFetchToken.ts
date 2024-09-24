// hooks/useFetchToken.ts
import { useState, useEffect } from 'react';
import { Token } from '../pages/api/interface/game';

const useFetchToken = () => {
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/randomToken');
      const data = await response.json();
      setToken({
        name: data.name,
        symbol: data.symbol,
        logoURI: data.logoURI,
        address: data.address,
      });
    } catch (error) {
      console.error('Error fetching token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return { token, loading, fetchToken };
};

export default useFetchToken;