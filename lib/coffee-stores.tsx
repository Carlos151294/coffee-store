import { createApi } from 'unsplash-js';
import coffeeStoresData from '../data/coffee-stores.json';

interface SearchResponse {
  results: CoffeeStore[];
}

export interface CoffeeStore {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  imgUrl: string;
}

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_ACCESS_KEY,
});

const getCoffeeStoresImages = async (): Promise<string[]> => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  });

  return photos.response.results.map((result) => result.urls.regular);
};

const getCoffeeStoresUrl = (latLong: string, query: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStoresImages();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const url = getCoffeeStoresUrl(
    '42.35209626080208%2C-71.04599828318548', // Seaport, Boston
    'coffee',
    6
  );

  const response = await fetch(url, options);
  const { results } = await response.json();

  return results.map((coffeeStore, index: number) => ({
    id: coffeeStore.fsq_id,
    name: coffeeStore.name,
    address: coffeeStore.location.address,
    neighborhood: coffeeStore.location.neighborhood[0],
    imgUrl: photos[index],
  }));
};

export const fetchCoffeeStoresMock = async (): Promise<CoffeeStore[]> => {
  const photos = await getCoffeeStoresImages();

  return coffeeStoresData.map((coffeeStore, index: number) => ({
    id: coffeeStore.fsq_id,
    name: coffeeStore.name,
    address: coffeeStore.location.address,
    neighborhood: coffeeStore.location.neighborhood[0],
    imgUrl: photos[index],
  }));
};
