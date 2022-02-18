import React from 'react'
import { Route, Switch } from 'react-router'
import NotFound from './404'
import Signup from './Signup.jsx'
import Login from './Login'
import Index from './Index.jsx'

const App = () => {
    return (<>
        <Switch>
            <Route exact path="/" render={()=><Index/>}/>          
            <Route exact path="/login" render={() => <Login/>} />
            <Route exact path="/signup" render={() => <Signup/>} />
            <Route render={() => <NotFound/>} />
        </Switch>
    </>
    )
}

export default App