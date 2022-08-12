import { createApi } from 'unsplash-js';
import coffeeStoresData from '../data/coffee-stores.json';

export interface CoffeeStore {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  imgUrl: string;
  voting: number;
}

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY,
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

export const fetchCoffeeStores = async (
  latLong: string,
  limit: number = 6
): Promise<CoffeeStore[]> => {
  const photos = await getCoffeeStoresImages();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const url = getCoffeeStoresUrl(latLong, 'coffee', limit);

  const response = await fetch(url, options);
  const { results } = await response.json();

  return results.map((coffeeStore, index: number) => ({
    id: coffeeStore.fsq_id,
    name: coffeeStore.name,
    address: coffeeStore.location.address,
    neighborhood: coffeeStore.location.locality,
    imgUrl: photos[index],
  }));
};

export const fetchCoffeeStoresMock = async (
  nearMe = false
): Promise<CoffeeStore[]> => {
  const photos = await getCoffeeStoresImages();

  const initialCoffeeStores = coffeeStoresData.slice(0, 5);
  const coffeeStoresNearMe = coffeeStoresData.slice(5);

  return [...(nearMe ? coffeeStoresNearMe : initialCoffeeStores)].map(
    (coffeeStore, index: number) => ({
      id: coffeeStore.fsq_id,
      name: coffeeStore.name,
      address: coffeeStore.location.address,
      neighborhood: coffeeStore.location.neighborhood[0],
      imgUrl: photos[index],
      voting: 0,
    })
  );
};
