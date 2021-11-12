// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { getAccessToken, setAccessToken } from "./accessToken";
// import { Start } from "./start";
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { ApolloLink, Observable } from "apollo-link";
// import { TokenRefreshLink } from "apollo-link-token-refresh";
// import jwtDecode from "jwt-decode";

// const cache = new InMemoryCache({});

// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable((observer) => {
//       let handle: any;
//       Promise.resolve(operation)
//         .then((operation) => {
//           const accessToken = getAccessToken();
//           if (accessToken) {
//             operation.setContext({
//               headers: {
//                 authorization: `bearer ${accessToken}`,
//               },
//             });
//           }
//         })
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer),
//           });
//         })
//         .catch(observer.error.bind(observer));

//       return () => {
//         if (handle) handle.unsubscribe();
//       };
//     })
// );

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     new TokenRefreshLink({
//       accessTokenField: "accessToken",
//       isTokenValidOrUndefined: () => {
//         const token = getAccessToken();

//         if (!token) {
//           return true;
//         }

//         try {
//           const { exp }: any = jwtDecode(token);
//           if (Date.now() >= exp * 1000) {
//             return false;
//           } else {
//             return true;
//           }
//         } catch {
//           return false;
//         }
//       },
//       fetchAccessToken: () => {
//         return fetch("http://localhost:4000/refresh_token", {
//           method: "POST",
//           credentials: "include",
//         });
//       },
//       handleFetch: (accessToken: any) => {
//         setAccessToken(accessToken);
//       },
//       handleError: (err: any) => {
//         console.warn("Your refresh token is invalid. Try to relogin");
//         console.error(err);
//       },
//     }),
//     onError(({ graphQLErrors, networkError }) => {
//       console.log(graphQLErrors);
//       console.log(networkError);
//     }),
//     requestLink,
//     new HttpLink({
//       uri: "http://localhost:4000/graphql",
//       credentials: "include",
//     }),
//   ]),
//   cache,
// });

// ReactDOM.render(
//   <ApolloProvider client={client as any}>
//     <Start />
//   </ApolloProvider>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApolloClient from "apollo-boost";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/react-hooks";
import { getAccessToken } from "./accessToken";
import { Start } from "./start";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  request: (operation) => {
    const accessToken = getAccessToken();
    operation.setContext({
      headers: {
        authorization: accessToken ? `bearer ${accessToken}` : "",
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Start />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
