import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
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
} from '../../components/styles/pages/coffee-store';

type CoffeeStoreProps = {
  coffeeStore: CoffeeStoreModel;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const coffeeStores = await fetchCoffeeStores(BOSTON_LAT_LONG);

  const coffeeStore =
    coffeeStores.find((coffeeStore) => coffeeStore.id === context.params.id) ||
    {};
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

export const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CoffeeStore(initialProps: CoffeeStoreProps) {
  const router = useRouter();
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  const [coffeeStore, setCoffeeStore] = useState<CoffeeStoreModel>(
    initialProps.coffeeStore
  );
  const coffeeStoreId = router.query.id;
  const [votingCount, setVotingCount] = useState(0);
  const { data, error } = useSWR(
    `/api/getCoffeeStoreById?id=${coffeeStoreId}`,
    fetcher
  );

  const createCoffeeStore = async (coffeeStore: CoffeeStoreModel) => {
    try {
      const response = await fetch('/api/coffee-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...coffeeStore, voting: 0 }),
      });
      await response.json();
    } catch (error) {
      console.error('Error creating coffee store', error);
    }
  };

  const handleUpdateVoting = async () => {
    try {
      const response = await fetch(
        `/api/favoriteCoffeeStoreById?id=${coffeeStoreId}`,
        {
          method: 'PUT',
        }
      );
      await response.json();
      const count = votingCount + 1;
      setVotingCount(count);
    } catch (error) {
      console.error('Error updating voting from coffee store', error);
    }
  };

  const fetchAirtableCoffeStore = useCallback(async () => {
    if (!coffeeStoreId) return;

    const response = await fetch(`/api/coffee-store?id=${coffeeStoreId}`);
    const dbCoffeeStores = await response.json();

    if (dbCoffeeStores?.length) {
      const [dbCoffeeStore] = dbCoffeeStores;
      setCoffeeStore(dbCoffeeStore);
    }
  }, [coffeeStoreId]);

  useEffect(() => {
    // Coffee store not initialized in getStaticProps
    if (isEmpty(initialProps.coffeeStore)) {
      const contextCoffeeStore = coffeeStores.find(
        (coffeeStore) => coffeeStore.id === coffeeStoreId
      );

      if (contextCoffeeStore) {
        setCoffeeStore(contextCoffeeStore);
        createCoffeeStore(contextCoffeeStore);
      } else {
        // Fetch Coffee Store from Airtable
        fetchAirtableCoffeStore();
      }
    } else {
      // SSG
      createCoffeeStore(initialProps.coffeeStore);
    }
  }, [
    coffeeStoreId,
    initialProps.coffeeStore,
    coffeeStores,
    fetchAirtableCoffeStore,
  ]);

  useEffect(() => {
    if (data?.voting) {
      setVotingCount(data.voting);
    }
  }, [data]);

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { name, imgUrl, address, neighborhood } = coffeeStore || {};

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{name}</title>
        <meta
          name='coffee stores home page'
          content={`${name} coffee store`}
        ></meta>
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
              <Image
                src='/static/icons/places.svg'
                alt='Address icon'
                width={24}
                height={24}
              />
              <Text>{address}</Text>
            </IconWrapper>
          )}
          {neighborhood && (
            <IconWrapper>
              <Image
                src='/static/icons/nearMe.svg'
                alt='Neighborhood icon'
                width={24}
                height={24}
              />
              <Text>{neighborhood}</Text>
            </IconWrapper>
          )}
          <IconWrapper>
            <Image
              src='/static/icons/star.svg'
              alt='Voting icon'
              width={24}
              height={24}
            />
            <Text>{votingCount}</Text>
          </IconWrapper>
          <UpvoteButton onClick={handleUpdateVoting}>Up vote!</UpvoteButton>
        </Col2>
      </Container>
    </Layout>
  );
}
