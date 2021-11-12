import {
  BrowserRouter,
  Link,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useLogoutMutation } from "./generated/graphql";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";

const App: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [logout, { client }] = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    await client!.resetStore();
    return history.push("/");
  };
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/user">User</Link>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/user" component={User} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
