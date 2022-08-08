import Head from 'next/head';
import Banner from '../components/Banner';
import Card from '../components/Card';
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
  const handleBannerClick = () => {
    console.log('Banner clicked!');
  };

  return (
    <Container>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Banner btnText='View stores nearby' handleClick={handleBannerClick} />
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
