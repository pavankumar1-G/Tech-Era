import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const apiConstantsOfCourseItem = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const CourseItem = props => {
  const {courseDetails} = props
  const {name, imageUrl, description} = courseDetails

  return (
    <div className="course-details-container">
      <div className="course-item-card">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="name-and-description-container">
          <h1 className="course-name">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    </div>
  )
}

class CourseItemDetails extends Component {
  state = {courseItemDetails: {}, apiStatus: apiConstantsOfCourseItem.initial}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiConstantsOfCourseItem.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseItemUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const courseItemResponse = await fetch(courseItemUrl, options)
    if (courseItemResponse.ok) {
      const courseItemData = await courseItemResponse.json()
      const updatedCourseItemData = {
        id: courseItemData.course_details.id,
        name: courseItemData.course_details.name,
        imageUrl: courseItemData.course_details.image_url,
        description: courseItemData.course_details.description,
      }

      this.setState({
        courseItemDetails: updatedCourseItemData,
        apiStatus: apiConstantsOfCourseItem.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsOfCourseItem.failure})
    }
  }

  renderCourseItemLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader width={50} height={50} type="TailSpin" color="#00BFFF" />
    </div>
  )

  renderCourseItemSuccessView = () => {
    const {courseItemDetails} = this.state

    return <CourseItem courseDetails={courseItemDetails} />
  }

  retryCourseDetails = () => {
    this.getCourseItemDetails()
  }

  renderCourseItemFailureView = () => (
    <FailureView retryCourseDetails={this.retryCourseDetails} />
  )

  renderCourseItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsOfCourseItem.inProgress:
        return this.renderCourseItemLoadingView()
      case apiConstantsOfCourseItem.success:
        return this.renderCourseItemSuccessView()
      case apiConstantsOfCourseItem.failure:
        return this.renderCourseItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-item-details-container">
        <Header />
        <div className="course-item-content-container">
          {this.renderCourseItemDetails()}
        </div>
      </div>
    )
  }
}
export default CourseItemDetails
