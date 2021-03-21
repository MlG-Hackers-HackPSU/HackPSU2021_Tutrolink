import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
<<<<<<< HEAD
        <Route path="/dashboard/:session">
            <Dashboard />
=======
        <Route path="/admin">
            <Admin />
>>>>>>> d9be2ef5b9c47c2af2225a1ef3a1e25da2da9ec0
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
