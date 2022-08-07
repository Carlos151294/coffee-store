import Head from 'next/head';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { Container, Main, HeroImage, CardLayout } from './styles';

export default function Home() {

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
        <CardLayout>
          <Card name='Darkhorse coffee' imageUrl='/static/hero-image.png' href='/coffee-store/yolo' />
          <Card name='Darkhorse coffee' imageUrl='/static/hero-image.png' href='/coffee-store/yolo' />
          <Card name='Darkhorse coffee' imageUrl='/static/hero-image.png' href='/coffee-store/yolo' />
          <Card name='Darkhorse coffee' imageUrl='/static/hero-image.png' href='/coffee-store/yolo' />
          <Card name='Darkhorse coffee' imageUrl='/static/hero-image.png' href='/coffee-store/yolo' />
          <Card name='Darkhorse coffee' imageUrl='/static/hero-image.png' href='/coffee-store/yolo' />
        </CardLayout>
      </Main>
    </Container>
  );
}
