import { MouseEvent, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import * as S from "./pagination.styles";
import { ApolloQueryResult } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/src/commons/types/generated/types";

interface IProps {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
}

export default function Pagination(props: IProps): JSX.Element {
  const router = useRouter();
  const [startPage, setStartPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // URL 변경 감지 및 데이터 refetch
  useLayoutEffect(() => {
    const currentPage = Number(router.query.page) || 1;
    setActivePage(currentPage);
    setStartPage(Math.floor((currentPage - 1) / 10) * 10 + 1);

    // URL이 변경될 때마다 데이터 refetch
    if (currentPage !== 1) {
      void props.refetch({ page: currentPage });
    }
  }, [router.query.page]);

  const onClickPage = (e: MouseEvent<HTMLDivElement>): void => {
    const page = Number(e.currentTarget.id);

    // URL 업데이트
    void router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: page },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <S.Wrap>
      {new Array(10).fill(1).map((_, index) => (
        <S.Page
          key={startPage + index}
          id={String(startPage + index)}
          onClick={onClickPage}
          style={{
            fontWeight: activePage === startPage + index ? "bold" : "normal",
            color: activePage === startPage + index ? "red" : "black",
          }}
        >
          {startPage + index}
        </S.Page>
      ))}
    </S.Wrap>
  );
}
