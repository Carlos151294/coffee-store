import { useState } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

interface Position {
  coords: Coords;
}

export const useLocation = () => {
  const [coords, setCoords] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const success = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    
    setCoords(`${latitude},${longitude}`);
    setErrorMsg('');
    setLoading(false);
  };

  const error = (error) => {
    console.log(error.message);
    setErrorMsg(`Unable to retrieve your location`);
    setCoords('');
    setLoading(false);
  };

  const handleTrackLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported in your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    coords,
    loading,
    errorMsg,
    handleTrackLocation,
  };
};
