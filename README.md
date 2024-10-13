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
 Next.js의 라우터가 준비되지 않았을 때 GraphQL 쿼리의 실행을 건너뛰도록 하는 옵션입니다. <br><br>
 이는 초기 Boards API 요청이 나가고 refetch로 router.query.page 값으로 추가 API 요청이 일어나 2번의 API 요청을 막기 위함 입니다. <br><br>
 이렇게 해줘야 초기 실행을 건너뛰고 Pagination의 컴포넌트에서 useEffect로 refetch를 진행합니다. <br><br>

## index.tsx
- useQuery 훅을 사용해 data 불러오기

  ```bash
  const { data, refetch } = useQueryFetchBoards();
  ```

  **<Pagination />
  - Pagination에 props로 refetch={refetch} 로 넘겨줍니다. / <Pagination refetch={refetch} />

## pagination.tsx
```bash
return (
    <S.Wrap>
      {new Array(10).fill(1).map((_, index) => (
        <S.Page
          key={startPage + index}
          id={String(startPage + index)}
          onClick={onClickPage}
          style={{
            fontWeight: activePage === startPage + index ? "bold" : "normal",
          }}
        >
          {startPage + index}
        </S.Page>
      ))}
    </S.Wrap>
  );
```
<S.Page> 클릭으로 onClickPage 함수가 실행하는데 다음과 같습니다.

```bach
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
```
여기서 핵심은 { shallow: true } 입니다.
이는 페이지를 전환하지 않고 URL의 쿼리스트링의 값을 업데이트 합니다. <br>
즉 URL 변경으로 페이지가 다시 리렌더링 되지 않고 그대로 유지 되어 URL만 변경을 할 수 있습니다. <br><br>

이후 useEffect로 변경된 router.query.page의 값을 가지고 props로 넘겨받은 refetch를 진행합니다.
```bash
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
```
