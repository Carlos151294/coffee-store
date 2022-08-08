import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CoffeeStore as CoffeeStoreModel,
  fetchCoffeeStores,
  fetchCoffeeStoresMock,
} from '../../lib/coffee-stores';
import {
  BackToHomeLink,
  Col1,
  Col2,
  Container,
  IconWrapper,
  Layout,
  Name,
  NameWrapper,
  StyledImage,
  Text,
  UpvoteButton,
} from './styles';

export async function getStaticProps(context: GetStaticPropsContext) {
  const coffeeStores = await fetchCoffeeStoresMock();
  return {
    props: {
      ...coffeeStores.find(
        (coffeeStore) => coffeeStore.id === context.params.id
      ),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStoresMock();
  const paths = coffeeStores.map((coffeeStore) => ({
    params: { id: coffeeStore.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({
  name,
  imgUrl,
  address,
  neighborhood,
}: CoffeeStoreModel) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const handleUpvoteClick = () => {
    console.log('upvote!');
  };

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <Container>
        <Col1>
          <BackToHomeLink>
            <Link href='/'>
              <a>Back to home</a>
            </Link>
          </BackToHomeLink>
          <NameWrapper>
            <Name>{name}</Name>
          </NameWrapper>
          <StyledImage src={imgUrl} width={600} height={360} alt={name} />
        </Col1>
        <Col2>
          {address && (
            <IconWrapper>
              <Image src='/static/icons/places.svg' width={24} height={24} />
              <Text>{address}</Text>
            </IconWrapper>
          )}
          {neighborhood && (
            <IconWrapper>
              <Image src='/static/icons/nearMe.svg' width={24} height={24} />
              <Text>{neighborhood}</Text>
            </IconWrapper>
          )}
          <IconWrapper>
            <Image src='/static/icons/star.svg' width={24} height={24} />
            <Text>1</Text>
          </IconWrapper>
          <UpvoteButton onClick={handleUpvoteClick}>Up vote!</UpvoteButton>
        </Col2>
      </Container>
    </Layout>
  );
}
