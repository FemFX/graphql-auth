import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [register] = useRegisterMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await register({
      variables: {
        email,
        password,
      },
    });
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

export default Register;
