import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { accessToken, setAccessToken } from "../accessToken";
import { useLoginMutation } from "../generated/graphql";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login] = useLoginMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await login({
      variables: {
        email,
        password,
      },
    });
    if (res && res.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setAccessToken(res.data.login.accessToken);
    }

    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
