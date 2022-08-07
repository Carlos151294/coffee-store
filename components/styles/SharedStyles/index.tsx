import styled from "styled-components";

export const GlassContainer = styled.div`
  background: hsla(0, 0%, 100%, 0.4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid hsla(0, 0%, 100%, 0.2);

  &:hover {
    background: hsla(0, 0%, 100%, 0.7);
    border: 1px solid #fff;
  }
`;