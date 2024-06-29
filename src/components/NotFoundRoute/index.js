import Header from '../Header'

import './index.css'

const NotFoundRoute = () => (
  <div className="not-found-container">
    <Header />
    <div className="not-found-content">
      <img
        className="not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-note">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)
export default NotFoundRoute
