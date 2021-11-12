import { useHelloQuery } from "../generated/graphql";

const User = () => {
  const { data, error, loading } = useHelloQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  if (!data) {
    return <div>No</div>;
  }
  return <div>{data?.hello}</div>;
};

export default User;
