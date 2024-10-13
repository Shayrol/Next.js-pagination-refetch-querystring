import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/src/commons/types/generated/types";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const useQueryFetchBoards = (): QueryResult<
  Pick<IQuery, "fetchBoards">,
  IQueryFetchBoardsArgs
> => {
  const router = useRouter();
  const result = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
    {
      variables: { page: Number(router.query.page) || 1 },
      skip: !router.isReady,
    }
  );

  return result;
};
