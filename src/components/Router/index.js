import React from 'react'
import {
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import From from '../FormModal'
import App from '../App'
class RouterApp extends React.Component {
    render() {
        return (
            <div>

                <Redirect path='/' to="/app" />
                <Switch>
                    <Route path='/form' component={From} />
                    <Route path='/app' component={App} />
                </Switch>
            </div>

        )
    }
}
export default RouterApp