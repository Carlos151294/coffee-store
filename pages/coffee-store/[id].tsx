import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  CoffeeStore as CoffeeStoreModel,
  fetchCoffeeStores,
} from '../../lib/coffee-stores';
import { isEmpty } from '../../utils';
import { BOSTON_LAT_LONG } from '../../utils/constants';
import { StoreContext } from '../../store/store-context';
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

type CoffeeStoreProps = {
  coffeeStore: CoffeeStoreModel;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const coffeeStores = await fetchCoffeeStores(BOSTON_LAT_LONG);

  const coffeeStore =
    coffeeStores.find((coffeeStore) => coffeeStore.id === context.params.id) ||
    {};
  console.log(coffeeStore);
  return {
    props: {
      coffeeStore,
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores(BOSTON_LAT_LONG);
  const paths = coffeeStores.map((coffeeStore) => ({
    params: { id: coffeeStore.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(initialProps: CoffeeStoreProps) {
  const router = useRouter();
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  const [coffeeStore, setCoffeeStore] = useState<CoffeeStoreModel>(
    initialProps.coffeeStore
  );

  useEffect(() => {
    // Coffee store not initialized in getStaticProps
    if (router.isFallback) return;

    if (isEmpty(coffeeStore) && coffeeStores.length === 0) {
      alert('Coffee Store does not exist!');
      router.push('/');
      return;
    }

    const foundCoffeeStore = coffeeStores.find(
      (coffeeStore) => coffeeStore.id === router.query.id
    );
    setCoffeeStore(foundCoffeeStore);
  }, [router.isFallback]);

  if (router.isFallback || isEmpty(coffeeStore)) {
    return <div>Loading</div>;
  }

  const { name, imgUrl, address, neighborhood } = coffeeStore || {};

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
          {imgUrl && (
            <StyledImage src={imgUrl} width={600} height={360} alt={name} />
          )}
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
