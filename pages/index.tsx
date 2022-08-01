import Head from 'next/head';
import Banner from '../components/Banner';
import { Container, Main, HeroImage } from './styles';

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
      </Main>
    </Container>
  );
}
