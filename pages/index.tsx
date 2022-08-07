import Head from 'next/head';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { Container, Main, HeroImage, CardLayout, Heading2 } from './styles';
import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps() {
  return {
    props: { coffeeStores: coffeeStoresData }, // will be passed to the page component as props
  };
}

export default function Home({ coffeeStores }) {
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
            <Heading2>Toronto stores</Heading2>
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
