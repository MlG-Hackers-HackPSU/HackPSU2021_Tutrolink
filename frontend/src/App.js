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
        <Route path="/dashboard/:session">
            <Dashboard />
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
