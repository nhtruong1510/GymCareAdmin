import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import RevenueStatistics from '../pages/RevenueStatistics'
import RegisterStatistics from '../pages/RegisterStatistics'
import Trainers from '../pages/Trainers'
import Schedules from '../pages/Schedules'
import Class from '../pages/Class'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/trainers' component={Trainers}/>
            <Route path='/analytics' component={RevenueStatistics}/>
            <Route path='/analytics_register' component={RegisterStatistics}/>
            <Route path='/schedules' component={Schedules}/>
            <Route path='/classes' component={Class}/>
        </Switch>
    )
}

export default Routes
