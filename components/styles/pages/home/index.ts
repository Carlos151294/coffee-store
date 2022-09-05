import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 1.5rem /* 16px */;
  padding-right: 1.5rem /* 16px */;

  @media (${({ theme }) => theme.breakpoints.sm}) {
    padding-left: 2.5rem /* 24px */;
    padding-right: 2.5rem /* 24px */;
  }
  @media (${({ theme }) => theme.breakpoints.lg}) {
    padding-left: 3rem /* 32px */;
    padding-right: 3rem /* 32px */;
  }
`;

export const Main = styled.div`
  margin-top: 2.5rem /* 40px */;
  position: relative;

  @media (${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 3rem /* 48px */;
  }
  @media (${({ theme }) => theme.breakpoints.md}) {
    margin-top: 4rem /* 64px */;
  }
  @media (${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 5rem /* 80px */;
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 1200px;
  height: auto;
  z-index: 0;
`;

export const CardLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  grid-gap: 2.5rem;
`;

export const Heading2 = styled.h2`
  font-size: 2.25rem;
  line-height: 2.5rem;
  padding-bottom: 2rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.white100};
`;