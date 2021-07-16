import logo from './logo.svg';
import './App.css';
import Home from './modules/components/Home';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LyricsPlayer from './modules/components/LyricsPlayer/LyricsPlayer';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path="/player/:lyricsId" component={LyricsPlayer} />
      </Switch>

    </Router>
  );
}

export default App;
