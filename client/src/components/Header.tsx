// import React from "react";
// import { Link } from "react-router-dom";
// import { useHelloQuery, useLogoutMutation } from "../generated/graphql";
// import { setAccessToken } from "../accessToken";

// interface Props {}

// export const Header: React.FC<Props> = () => {
//   const { data, loading } = useHelloQuery();
//   const [logout, { client }] = useLogoutMutation();

//   let body: any = null;

//   if (loading) {
//     body = null;
//   } else if (data && data.hello) {
//     body = <div>you are logged in as: {data.hello.email}</div>;
//   } else {
//     body = <div>not logged in</div>;
//   }

//   return (
//     <header>
//       <div>
//         <Link to="/">home</Link>
//       </div>
//       <div>
//         <Link to="/register">register</Link>
//       </div>
//       <div>
//         <Link to="/login">login</Link>
//       </div>
//       <div>
//         <Link to="/bye">bye</Link>
//       </div>
//       <div>
//         {!loading && data && data.hello ? (
//           <button
//             onClick={async () => {
//               await logout();
//               setAccessToken("");
//               await client!.resetStore();
//             }}
//           >
//             logout
//           </button>
//         ) : null}
//       </div>
//       {body}
//     </header>
//   );
// };
export {}