import React, { useState, useEffect } from "react";
import { setAccessToken } from "./accessToken";
import App from "./App";

interface Props {}

export const Start: React.FC<Props> = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState<boolean>(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <App />;
};
