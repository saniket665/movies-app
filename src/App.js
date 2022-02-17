import './App.css';
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movie from "./Components/Movie";
import Favourite from './Components/Favourite';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
        <Route path="/" exact render={(props)=>(
        <>
        <Banner {...props}/>
        <Movie {...props}/>
        </>
        )}/>
        <Route path="/favourite" component = {Favourite}/>
        </Switch>
    </Router>
  </>  
  );
}

export default App;
