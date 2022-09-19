import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home.jsx'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>     
        <Route path= '/' component={Home} />
      </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;
