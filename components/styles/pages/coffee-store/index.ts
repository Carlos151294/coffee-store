import Image from 'next/image';
import styled from 'styled-components';
import { GlassContainer } from '../../SharedStyles';

export const BackToHomeLink = styled.div`
  margin-top: 6rem /* 96px */;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  margin-bottom: 0.5rem /* 8px */;
  font-weight: 700;
`;

export const Layout = styled.div`
  height: 100%;

  @media (${({ theme }) => theme.breakpoints.sm}) {
    padding-left: 1rem /* 16px */;
    padding-right: 1rem /* 16px */;
  }

  @media (${({ theme }) => theme.breakpoints.md}) {
    padding-left: 2.5rem /* 40px */;
    padding-right: 2.5rem /* 40px */;
  }

  @media (${({ theme }) => theme.breakpoints.lg}) {
    padding-left: 2.5rem /* 40px */;
    padding-right: 2.5rem /* 40px */;
    height: 100vh;
  }
`;

export const Container = styled.div`
  display: grid;
  padding-top: 1.75rem /* 28px */;
  padding-bottom: 1.75rem /* 28px */;
  padding-left: 1.75rem /* 12px */;
  padding-right: 0.75rem /* 12px */;

  @media (${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }

  @media (${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Col1 = styled.div`
  place-self: center;
`;

export const Col2 = styled(GlassContainer)`
  border-radius: 1rem /* 16px */;
  padding: 1rem /* 16px */;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem /* 8px */;
  align-self: center;
  margin-top: 4rem /* 64px */;
  color: rgba(55, 59, 100, 1);

  @media (${({ theme }) => theme.breakpoints.lg}) {
    width: 75%;
  }
`;

export const StyledImage = styled(Image)`
  /* box-shadow: var(0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 #0000),
  0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 #0000,
  0 25px 50px -12px rgba(0, 0, 0, 0.25); */

  border-radius: 0.75rem /* 12px */;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  border-style: none;
`;

export const NameWrapper = styled.div`
  margin-bottom: 1rem /* 16px */;
  margin-top: 1rem /* 16px */;
`;

export const Name = styled.h1`
  color: ${({ theme }) => theme.colors.white100};
  font-size: 2.25rem /* 36px */;
  line-height: 2.5rem /* 40px */;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
`;

export const IconWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem /* 16px */;
`;

export const Text = styled.p`
  padding-left: 0.5rem /* 8px */;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  margin: 0;
  font-weight: 700;
`;

export const UpvoteButton = styled.button`
  width: fit-content;
  color: ${({ theme }) => theme.colors.white100};
  margin-top: 1rem /* 16px */;
  margin-bottom: 1rem /* 16px */;
  padding-left: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;

  background-color: ${({ theme }) => theme.colors.purpleDark};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  outline: 0;
  border: 0px;

  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
  }
`;
