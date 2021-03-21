import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Home from "./pages/Home.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
