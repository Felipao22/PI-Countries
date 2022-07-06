import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage';
import Home from './components/home/Home.jsx'
import Activity from './components/activity/Activity.jsx'
import Detail from './components/detail/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage} />
        <Route path= '/home' component={Home} />
        <Route path= '/activities' component={Activity} />
        <Route exact path= '/countries/:id' component={Detail} />
      </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;
