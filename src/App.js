import {Switch, Redirect, Route} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import CourseItemDetails from './components/CourseItemDetails'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
