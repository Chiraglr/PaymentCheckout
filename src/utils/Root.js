import Loading from 'common/loading/Loading';
import Loadable from 'react-loadable';
import {Link} from 'react-router-dom';
import React from 'react';
import Utils from 'utils/Utils';

const LoadingComponent = (props) => {
    if (props.error) {
        return <div
            className={"jumbotron jumbotron-fluid text-center vh-100 d-flex justify-content-center align-items-center"}>
            <div className="container">
                <img src={Utils.cdnUrl('icons/404.svg')} alt="404 not found" className="mx-auto d-block img-fluid" />
                <Link className={"fw-500 text-center mt-4"} to={"/"}>Go to home</Link>
            </div>
        </div>;
    } else if (props.timedOut) {
        return <div
            className={"jumbotron jumbotron-fluid text-center vh-100 d-flex justify-content-center align-items-center"}>
            <div className="container">
                <p className="text-center">Oops! Time out.</p>
                <Link className={"fw-500 text-center mt-4"} to={"/"}>Go to home</Link>
            </div>
        </div>;
    } else {
        return <div><Loading /></div>;
    }
}

const Root = (componentImport) => Loadable({
    loader: () => componentImport,
    loading: LoadingComponent
});

export default Root;
