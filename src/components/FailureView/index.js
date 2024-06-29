import './index.css'

const FailureView = props => {
  const {retryCourseDetails} = props

  const onClickRetryButton = () => {
    retryCourseDetails()
  }

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-note">
        We cannot seem to find the page you are looking for.
      </p>
      <div className="button-container">
        <button
          type="button"
          className="retry-button"
          onClick={onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )
}
export default FailureView
