import { useQueryFetchBoards } from "@/src/components/commons/hooks/graphql-queries/useQueryFetchBoards";
import * as S from "../styles/main.styles";
import { getDate } from "@/src/commons/libraries/getDate";
import Pagination from "@/src/components/commons/hooks/pagination/pagination";
import { useRouter } from "next/router";

export default function QueryString(): JSX.Element {
  const { data, refetch } = useQueryFetchBoards();
  // const color = #7d7d7d;

  return (
    <S.Wrap>
      <S.BoardsWrap>
        <S.BoardHeader>
          <S.HeaderWriter>작성자</S.HeaderWriter>
          <S.HeaderTitle>제목</S.HeaderTitle>
          <S.HeaderCreated>작성일</S.HeaderCreated>
        </S.BoardHeader>
        {data?.fetchBoards.map((el) => (
          <S.Board key={el._id}>
            <S.Writer>{el.writer}</S.Writer>
            <S.Title>{el.title}</S.Title>
            <S.Created>{getDate(el.createdAt)}</S.Created>
          </S.Board>
        ))}
      </S.BoardsWrap>
      <Pagination refetch={refetch} />
    </S.Wrap>
  );
}
