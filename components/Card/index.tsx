import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { GlassContainer } from '../styles/SharedStyles';

const StyledA = styled.a`
  /* margin: auto; */
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: 0 0 transparent, 0 0 #0000, 0 0 transparent, 0 0 #0000,
    0 0 transparent;

  border-color: ${({ theme }) => theme.colors.white100 };
  border-radius: 0.75rem /* 12px */;
`;

const StyledLink = ({ href, children }) => (
  <Link href={href} passHref>
    <StyledA>{children}</StyledA>
  </Link>
);

const Container = styled(GlassContainer)`
  border-radius: 0.75rem /* 12px */;
  padding-top: 0.25rem /* 4px */;
  padding-bottom: 0.25rem /* 4px */;
  padding-bottom: 1.25rem /* 20px */;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;

  backdrop-filter: blur(10px);
`;

const HeaderWrapper = styled.div`
  margin-top: 0.75rem /* 12px */;
  margin-bottom: 0.75rem /* 12px */;
`;

const ImageWrapper = styled.div`
  color: ${({ theme }) => theme.colors.white100 };
`;

const Header = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  font-weight: 800;
  overflow: hidden;
  width: 16rem /* 256px */;
`;

const Imag = styled.img`
  border-radius: 0.75rem /* 12px */;
`;

export default function Card({ name, imageUrl, href }) {
  return (
    <StyledLink href={href}>
      <Container>
        <HeaderWrapper>
          <Header>{name}</Header>
        </HeaderWrapper>
        <ImageWrapper>
          <Imag src={imageUrl} alt={name} width={260} height={160} />
        </ImageWrapper>
      </Container>
    </StyledLink>
  );
}
