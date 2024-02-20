import { Link } from 'react-router-dom';
import './CSS/NotFoundPage.css'
const NotFoundPage = () => {
  return (
    <div className="NotFound_page_wrapper">
      <div className="NotFound_page">
        <div style={{ textAlign: 'center' }}>
        <img id="svg404" src="/assets/404.svg" alt="Go" />
        </div>

        <h1>404 Error.</h1>
        <p>We Can not find the page your looking for.</p>
        <button><Link to="/">Back to home</Link></button>
      </div>
    </div>
  );
};

export default NotFoundPage;
