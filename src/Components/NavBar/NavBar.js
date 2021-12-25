import styles from './NavBar.module.scss';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

function NavBar({ isBack, title, bottomBar, className, history }) {
  return <nav className={`pt-10 -mx-1 sticky top-0 bg-white ${styles.navBar} ${className}`}>
    <div className="max-w-screen-xl m-auto px-5">
      {isBack && <FontAwesomeIcon
              icon={faArrowLeft}
              size="2x"
              onClick={() => history.goBack()}
              className="cursor-pointer"
          />}
      <p className="text-3xl font-bold mb-1">{title}</p>
      {bottomBar}
    </div>
  </nav>
};

export default withRouter(NavBar);