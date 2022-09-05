import Head from 'next/head';
import { useCallback, useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { useLocation } from '../hooks/use-location';
import { CoffeeStore, fetchCoffeeStores } from '../lib/coffee-stores';
import { BOSTON_LAT_LONG } from '../utils/constants';
import { Container, Main, HeroImage, CardLayout, Heading2 } from '../components/styles/pages/home';
import { StoreContext, STORE_ACTION_TYPES } from '../store/store-context';

type HomeProps = {
  coffeeStores: CoffeeStore[];
};

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores(BOSTON_LAT_LONG);
  return {
    props: { coffeeStores }, // will be passed to the page component as props
  };
}

export default function Home({ coffeeStores: initialCoffeeStores }: HomeProps) {
  const { state, dispatch } = useContext(StoreContext);
  const {
    handleTrackLocation,
    loading,
    errorMsg: locationError,
  } = useLocation();
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const {
    coffeeStores,
    latLong,
  }: { coffeeStores: CoffeeStore[]; latLong: string } = state;

  const handleBannerClick = () => {
    handleTrackLocation();
  };

  const handleFetchCoffeeStores = useCallback(async () => {
    try {
      setCoffeeStoresError(null);
      const response = await fetch(`/api/coffee-stores?latLong=${latLong}&limit=10`);
      const coffeeStores = await response.json();
      dispatch({
        type: STORE_ACTION_TYPES.SET_COFFEE_STORES,
        payload: coffeeStores,
      });
    } catch (error) {
      console.log(error);
      setCoffeeStoresError(error.messsage);
    }
  }, [dispatch, latLong]);

  useEffect(() => {
    if (!latLong) return;

    handleFetchCoffeeStores();
  }, [latLong, handleFetchCoffeeStores]);

  return (
    <Container>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Banner
          btnText={loading ? 'Locating...' : 'View stores nearby'}
          handleClick={handleBannerClick}
        />
        {locationError && `Something went wrong: ${locationError}`}
        {coffeeStoresError && `Something went wrong: ${coffeeStoresError}`}
        <HeroImage src='/static/hero-image.png' />

        {coffeeStores.length > 0 && (
          <>
            <Heading2>Coffee Stores near me</Heading2>
            <CardLayout>
              {coffeeStores.map((coffeeStore) => (
                <Card
                  key={coffeeStore.id}
                  name={coffeeStore.name}
                  imageUrl={coffeeStore.imgUrl}
                  href={`/coffee-store/${coffeeStore.id}`}
                />
              ))}
            </CardLayout>
          </>
        )}

        {initialCoffeeStores.length > 0 && (
          <>
            <Heading2>Boston Coffee Stores</Heading2>
            <CardLayout>
              {initialCoffeeStores.map((coffeeStore) => (
                <Card
                  key={coffeeStore.id}
                  name={coffeeStore.name}
                  imageUrl={coffeeStore.imgUrl}
                  href={`/coffee-store/${coffeeStore.id}`}
                />
              ))}
            </CardLayout>
          </>
        )}
      </Main>
    </Container>
  );
}
