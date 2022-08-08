import Head from 'next/head';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { useLocation } from '../hooks/use-location';
import {
  CoffeeStore,
  fetchCoffeeStores,
  fetchCoffeeStoresMock,
} from '../lib/coffee-stores';
import { Container, Main, HeroImage, CardLayout, Heading2 } from './styles';

type HomeProps = {
  coffeeStores: CoffeeStore[];
};

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStoresMock();
  return {
    props: { coffeeStores }, // will be passed to the page component as props
  };
}

export default function Home({ coffeeStores }: HomeProps) {
  const { handleTrackLocation, coords, loading, errorMsg } = useLocation();

  const handleBannerClick = () => {
    handleTrackLocation();
  };

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
        {errorMsg && `Something went wrong: ${errorMsg}`} 
        <HeroImage src='/static/hero-image.png' />
        {coffeeStores.length > 0 && (
          <>
            <Heading2>Boston Coffee Stores</Heading2>
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
      </Main>
    </Container>
  );
}
