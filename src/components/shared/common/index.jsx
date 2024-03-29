import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Space = styled.div`
  height: ${({ h }) => h ?? "0px"};
  width: ${({ w }) => w ?? "0px"};
`;
