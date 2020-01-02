import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Suspense, lazy } from 'react';



const Game = lazy(() => import('./routes/Game'));
const Home = lazy(() => import('./routes/Home'));
const Dashboard = lazy(() => import('./routes/Dashboard'));

function App() {
  return (
    <div className="App">
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/game" component={Game}/>
                    <Route path="/dashboard" component={Dashboard}/>
                </Switch>
            </Suspense>
        </Router>
    </div>
  );
}

export default App;
