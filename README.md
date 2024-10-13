This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 작업환경
- React, Next.js, Typescript, Apollo, GraphQL, Emotion

## 목적
- 게시글 요청 API + Pagination 구현과 QueryString을 통해 해당 게시글 페이지 유지

---
## GraphQL 쿼리 셋팅
**API 요청하기**
- GraphQL 쿼리를 정의 하고, useQuery 훅을 사용 
```bash
// useQueryFetchBoards.ts

const result = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
    {
      variables: { page: Number(router.query.page) || 1 },
      skip: !router.isReady,
    }
```
여기서 중요한점은 router.query.page을 통해 API 요청을 해주기 위해 다음과 같은 설정이 필요합니다. <br><br>

```bash
variables: {page: Number(router.query.page) || 1}
```
해당 게시글(Boards)요청시 초기 page 설정을 router.query.page 가 있으면 해당 값을 사용하고 없으면 1페이지로 요청을 합니다. <br><br>

```bash
skip: !router.isReady
```
 Next.js의 라우터가 준비되지 않았을 때 GraphQL 쿼리의 실행을 건너뛰도록 하는 옵션입니다.
 이는 초기 Boards API 요청이 나가고 refetch로 router.query.page 값으로 추가 API 요청이 일어나 2번의 API 요청을 막기 위함 입니다.
 이렇게 해줘야 초기 실행을 건너뛰고 Pagination의 컴포넌트에서 useEffect로 refetch를 진행합니다. <br><br>

## index.tsx
- useQuery 훅을 사용해 data 불러오기

  ```bash
  const { data, refetch } = useQueryFetchBoards();
  ```

  **<Pagination />
  - Pagination에 props로 refetch={refetch} 로 넘겨줍니다. / <Pagination refetch={refetch} />

  
