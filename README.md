This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 작업환경
- React, Next.js, Typescript, Apollo, GraphQL, Emotion

## 목적
- 게시글 요청 API + Pagination 구현과 QueryString을 통해 해당 게시글 페이지 유지

---
**API 요청하기**
- GraphQL 쿼리를 정의 하고, useQuery 훅을 사용 
```bash
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
해당 게시글(Boards)요청시 초기 page 설정을 router.query.page 가 있으면 해당 값을 사용하고 없으면 1페이지로 요청을 합니다.


```bash
skip: !router.isReady
```
 Next.js의 라우터가 준비되지 않았을 때 GraphQL 쿼리의 실행을 건너뛰도록 하는 옵션입니다.
 이는 초기 Boards API 요청이 나가고 refetch로 router.query.page 값으로 추가 API 요청이 일어나 2번의 API 요청을 막기 위함 입니다.
 이렇게 해줘야 초기 실행을 건너뛰고 Pagination의 컴포넌트에서 useEffect로 refetch를 진행합니다.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
