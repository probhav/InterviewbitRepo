import './App.css';
import {HashRouter, Route ,Switch} from 'react-router-dom'
import Header from './Components/header.js'
import Dashboard from './Components/dasboard.js'
import Interviews from './Components/interviews.js'
import Update from './Components/update.js'

function App() {
  return (
    <div className="App">
      <HashRouter >
        <Header/>
          <Switch>
             <Route exact path='/' component = {Dashboard} />
             <Route path='/interviews' component = {Interviews} />
             <Route path='/update' component = {Update} />             
          </Switch>
      </HashRouter>
    </div>
  );
}

export default App;