import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  padding-left: 1.5rem /* 16px */;
  padding-right: 1.5rem /* 16px */;

  @media (${({ theme }) => theme.breakpoints.sm}) {
    padding-left: 2.5rem /* 24px */;
    padding-right: 2.5rem /* 24px */;
  }
  @media (${({ theme }) => theme.breakpoints.lg}) {
    text-align: left;
    margin-top: 5rem /* 80px */;
    padding-left: 3rem /* 32px */;
    padding-right: 3rem /* 32px */;
  }
`;

const Title = styled.h1`
  letter-spacing: -0.025em;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};

  font-size: 3rem /* 48px */;
  line-height: 1;
  
  @media (${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.75rem /* 60px */;
  }

  @media (${({ theme }) => theme.breakpoints.lg}) {
    font-size: 4.5rem /* 72px */;
  }
`;

const Title1 = styled.span`
  color: ${({ theme }) => theme.colors.white200};
  word-break: break-word;
`;

const Title2 = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.purple};
  word-break: break-word;

  @media (${({ theme }) => theme.breakpoints.xl}) {
    display: inline;
  }
`;

const Subtitle = styled.p`
  margin-top: 0.75rem;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;

  color: ${({ theme }) => theme.colors.white};

  @media (${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 1.25rem;
    max-width: 36rem;
  }
  
  @media (${({ theme }) => theme.breakpoints.md}) {
    margin-top: 1.25rem;
  }

  @media (${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1.25rem;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.purpleDark};
  cursor: pointer;
  color: white;
  outline: 0;
  border: 0px;

  padding-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  padding-left: 2.5rem /* 40px */;
  padding-right: 2.5rem /* 40px */;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purpleDark};
  }

  @media (${({ theme }) => theme.breakpoints.md}) {
    padding-top: 1rem /* 16px */;
    padding-bottom: 1rem /* 16px */;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    padding-left: 2.5rem /* 40px */;
    padding-right: 2.5rem /* 40px */;
  }
`;

export default function Banner({ btnText, handleClick }) {
  return (
    <Container>
      <Title>
        <Title1>Coffee </Title1>
        <Title2>Connoisseur</Title2>
      </Title>
      <Subtitle>Discover your local coffee shops!</Subtitle>
      <ButtonWrapper>
        <Button onClick={handleClick}>{btnText}</Button>
      </ButtonWrapper>
    </Container>
  );
}
