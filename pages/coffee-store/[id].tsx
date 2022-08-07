import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import coffeeStoresData from '../../data/coffee-stores.json';
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

export function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...coffeeStoresData.find(
        (store) => store.id.toString() === context.params.id
      ),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({ name, imgUrl, address, neighbourhood }) {
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
          <IconWrapper>
            <Image src='/static/icons/places.svg' width={24} height={24} />
            <Text>{address}</Text>
          </IconWrapper>
          <IconWrapper>
            <Image src='/static/icons/nearMe.svg' width={24} height={24} />
            <Text>{neighbourhood}</Text>
          </IconWrapper>
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
