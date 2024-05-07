import styled from '@emotion/styled';

export const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  @media screen and (min-width: 320px) {
    width: 320px;
  }

  @media screen and (min-width: 834px) {
    width: 800px;
  }

  @media screen and (min-width: 1440px) {
    width: 1100px;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 15px;
  border: 1px solid black;
`;
