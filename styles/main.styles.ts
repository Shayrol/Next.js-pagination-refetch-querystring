import styled from "@emotion/styled";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const BoardsWrap = styled.div`
  box-shadow: 0px 0px 5px #444;
  border-radius: 15px;
  width: 1200px;
  min-height: 528px;
  margin-bottom: 30px;
`;

export const BoardHeader = styled.div`
  border-bottom: 1px solid #444;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

export const HeaderWriter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10%;
  margin-left: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HeaderCreated = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10%;
  margin-right: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// Board List
export const Board = styled.div`
  border-bottom: 1px solid #7d7d7d;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :last-child {
    border: none;
  }
`;

export const Writer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10%;
  margin-left: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Created = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10%;
  margin-right: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
