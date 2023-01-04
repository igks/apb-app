import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
`;

export const Body = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 10px;
`;
export const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 10px;
`;