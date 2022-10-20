import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import PageDetail from "./components/PageDetail/PageDetail";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/recipes/:id" component={PageDetail} />
        <Route path="/create" component={CreateRecipe} />
      </Switch>
    </div>
  );
}

export default App;
