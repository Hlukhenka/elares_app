import styled from '@emotion/styled';

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 15px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const AdaptiveBox = styled.div`
  display: flex;
  text-align: start;
  @media screen and (min-width: 320px) and (max-width: 834px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1440px) {
    flex-direction: row;
    gap: 20px;
  }
`;