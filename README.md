## 작업환경
- React, Next.js, Typescript, Apollo, GraphQL, Emotion

## 목적
- Search, pagination 또는 상품 옵션 선택과 같은 정보를 URL에 저장을 하고 다시 해당 데이터를 가져오는데 있어 요청 처리를 고민했으며, <br>
  여기서 pagination 기준으로 refetch와 router.query의 사용으로 최적화 하는데 목적을 두고 있습니다. <br>
  (페이지 이동에 화면이 깜박이거나 API 요청이 2번 일어나는 현상이 있었습니다.)
---
![2024-10-1401-24-01-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/54f16014-42aa-43ef-ace3-ad9e8b6c7718)
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

  **Pagination**
  - Pagination에 props로 refetch={refetch} 로 넘겨줍니다.
  ```bash
  <Pagination refetch={refetch} />
  ```

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


## 정리글
- pagination 이동 시 router.query.page를 사용하여 페이지 번호를 query string으로 관리(?page=3 형식).
- shallow: true 옵션을 통해 페이지 이동 시 전체 화면을 리렌더링하지 않도록 최적화.
- useEffect를 사용하여 router.query.page가 변경될 때 Apollo의 refetch를 호출하여 데이터만 갱신.
- 이를 통해 불필요한 렌더링을 방지하고 사용자 경험을 개선했습니다.
