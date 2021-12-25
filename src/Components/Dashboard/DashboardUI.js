import {useState} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Button from "../Common/Button/Button";
import Locker from 'lockr';
import AuthService from '../../utils/ApiUtils/AuthService';
import OroLogo from '../../images/OroLogo.svg';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from '../../images/arrow.svg';
import styles from './Dashboard.module.scss';

function DashboardUI(props) {
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const [isAllPartnersPage, setPage] = useState(true);
    const userName = Locker.get('currentUser');
    function logout() {
        AuthService.logout();
    }
    function openPartnersPage(){
        setPage(true);
        setSideBarOpen(false);
    }
    function closePartnerDetailsPage(){
        setPage(false);
    }

    return <>
        <nav className={`w-100 fixed-top d-flex flex-wrap justify-content-between align-items-center px-4 py-3 ${styles.header}`}>
            <FontAwesomeIcon
                icon={faBars}
                onClick={() => setSideBarOpen((prev) => !prev)}
                size="1x"
                className="d-sm-none pointer"
            />
            <div className="d-flex align-items-center mb-0 mb-sm-0 text-white">
                <img src={OroLogo} alt="oro logo" />
            </div>
            <Button text="All Partners" className="fs-10 fw-600 bg-yellow border-radius-20 d-sm-none" onClick={openPartnersPage} />
            <div className="d-sm-flex align-items-end d-none">
                <p className="m-0 fs-16 mr-3">
                    Logged in as <span className="fw-600">{userName}</span>
                </p>
                <Button
                    className="darkBlue text-white bg-red"
                    onClick={logout}
                >
                    <p className="align-self-end pointer m-0 fs-14 fw-600">
                        Logout
                    </p>
                </Button>
            </div>
        </nav>
        {isSideBarOpen && <>
            <div className={`d-sm-none ${styles.overlay}`} onClick={() => setSideBarOpen((prev) => !prev)}>
                <div className={`bg-ligght-grey ${styles["side-bar"]}`} onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white pl-3 py-3">
                        <p className="fs-12 fw-600 grey-text m-0">
                            Logged in as
                        </p>
                        <p className="fs-16 fw-600 m-0">
                            {userName}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom" onClick={openPartnersPage}>
                        <p className="fs-14 fw-600 m-0">
                            All Partners
                        </p>
                        <img src={arrow} alt="right arrow" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" onClick={logout}>
                        <p className="fs-14 fw-600 m-0">
                            Logout
                        </p>
                        <img src={arrow} alt="right arrow" />
                    </div>
                </div>
            </div>
        </>}
        <Switch>
            <PrivateRoute exact path="/dashboard/:id*" render={() => <Dashboard isAllPartnersPage={isAllPartnersPage} closePartnerDetailsPage={closePartnerDetailsPage} />} />
            <PrivateRoute path="*" render={() => <Redirect to="/dashboard" />} />
        </Switch>
    </>;
}


function PrivateRoute(props){
    return <div className={styles.routeContainer} >
        <Route {...props} />
    </div>
}

export default withRouter(DashboardUI);