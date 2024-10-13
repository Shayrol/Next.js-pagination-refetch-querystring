import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
// import {onError} from "@apollo/client/link/error"
// import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSetting): JSX.Element {
  // const uploadLink = createUploadLink({
  //   uri: "https://backend-practice.codebootcamp.co.kr/graphql",
  // });

  // const errorLink = onError(({graphQLErrors, forward, operation}) => {

  // })

  const client = new ApolloClient({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
