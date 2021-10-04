import React, {createContext, useReducer} from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

import { initialState, reducer } from "../src/reducer/UseReducer";


export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/signup">
            <Signup />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
      
    </>
  )
}

export default App;