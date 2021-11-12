import { useUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Users:</div>
      <ul>
        {data?.users.map((u) => {
          return <li key={u.id}>{u.email}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
