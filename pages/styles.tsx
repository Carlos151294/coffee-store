import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 14rem /* 224px */;
`;

export const Main = styled.div`
  margin-top: 2.5rem /* 40px */;
  max-width: 72rem /* 1152px */;

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
  z-index: 1;
`;
