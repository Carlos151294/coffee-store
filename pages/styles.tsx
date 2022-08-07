import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 14rem /* 224px */;

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
  height: auto;
  z-index: 0;
`;

export const CardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  grid-gap: 1.5rem;

  @media (${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
