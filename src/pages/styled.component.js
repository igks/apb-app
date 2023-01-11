import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

export const Header = styled.div`
  padding: 0;
  margin: 0;
`;
export const Body = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

export const Title = styled.h5`
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ mb }) => mb};
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
`;

export const Divider = styled.hr`
  margin: 5px 0;
`;

export const EmptyNote = styled.div`
  margin: auto;
`;
