import { useContext, useState } from 'react';
import { StoreContext, STORE_ACTION_TYPES } from '../store/store-context';

interface Coords {
  latitude: number;
  longitude: number;
}

interface Position {
  coords: Coords;
}

export const useLocation = () => {
  const { dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const success = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;

    dispatch({
      type: STORE_ACTION_TYPES.SET_LAT_LONG,
      payload: `${latitude},${longitude}`,
    });
    setErrorMsg('');
    setLoading(false);
  };

  const error = (error) => {
    console.log(error.message);
    setErrorMsg(`Unable to retrieve your location`);
    dispatch({
      type: STORE_ACTION_TYPES.SET_LAT_LONG,
      payload: '',
    });
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
    loading,
    errorMsg,
    handleTrackLocation,
  };
};
