import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const apiConstantsOfHome = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const HomeCourseItem = props => {
  const {courseItemDetails} = props
  const {id, name, logoUrl} = courseItemDetails

  return (
    <Link to={`/courses/${id}`} className="course-item-link">
      <li className="course-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

const HomeCourseList = props => {
  const {courseDetails} = props
  return (
    <ul className="course-list">
      {courseDetails.map(eachCourse => (
        <HomeCourseItem key={eachCourse.id} courseItemDetails={eachCourse} />
      ))}
    </ul>
  )
}

class HomeRoute extends Component {
  state = {courseList: [], apiStatus: apiConstantsOfHome.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConstantsOfHome.inProgress})

    const courseUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const homeCourseResponse = await fetch(courseUrl, options)
    if (homeCourseResponse.ok) {
      const homeCourseData = await homeCourseResponse.json()
      const updatedHomeCourseData = homeCourseData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        courseList: updatedHomeCourseData,
        apiStatus: apiConstantsOfHome.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsOfHome.failure})
    }
  }

  renderHomeLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader width={50} height={50} type="TailSpin" color="#00BFFF" />
    </div>
  )

  renderHomeSuccessView = () => {
    const {courseList} = this.state

    return (
      <>
        <h1 className="course-heading">Courses</h1>
        <HomeCourseList courseDetails={courseList} />
      </>
    )
  }

  retryCourseDetails = () => {
    this.getCourseDetails()
  }

  renderHomeFailureView = () => (
    <FailureView retryCourseDetails={this.retryCourseDetails} />
  )

  renderCourseDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsOfHome.inProgress:
        return this.renderHomeLoadingView()
      case apiConstantsOfHome.success:
        return this.renderHomeSuccessView()
      case apiConstantsOfHome.failure:
        return this.renderHomeFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content-container">
          {this.renderCourseDetailsList()}
        </div>
      </div>
    )
  }
}
export default HomeRoute
