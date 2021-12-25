import { useState } from 'react';
import { withRouter } from "react-router";
import Button from "../Common/Button/Button";
import styles from './Dashboard.module.scss';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import osm from '../../osm-provider';
import Utils from '../../utils/utils';
import Partners from '../../DummyData/Partners';
import right from '../../images/right.svg';
import rightBigger from '../../images/rightBigger.svg';
import left from '../../images/left.svg';
import L from "leaflet";

const previousLayers = [];

function MapUpdater({partners,selectedPartner}){
    const map = useMap();
    map.invalidateSize();
    setTimeout(() => map.invalidateSize(),500);
    setTimeout(() => map.invalidateSize(),600);
    if(Utils.arrayCheck(partners[selectedPartner]?.stops).length){
        setTimeout(() => {
            if(previousLayers.length){
                for(let i in previousLayers){
                    previousLayers[i].remove();
                }
                previousLayers.length = 0;
            }
            const bounds = L.latLngBounds(Utils.arrayCheck(partners[selectedPartner]?.stops).map(({lat,long}) => L.latLng(lat,long)));
            map.fitBounds(bounds,{ padding: [20, 20] });
            Utils.arrayCheck(partners[selectedPartner]?.stops).forEach(({lat,long},index) => {
                let icon = L.divIcon({
                    className: styles["custom-div-icon"],
                    html: `<div style='background: linear-gradient(165.33deg, #F9CA36 22.08%, #F8B830 87.9%);box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);height: 100%;' class='marker-pin d-flex align-items-center'><p class='fs-20 fw-600 text-center' style='margin: auto; background-color: #fef3d6; height: 30px; width: 30px; border-radius: 20px;'>${index+1}</p></div><div class='${styles.mapDot}' />`,
                    iconSize: [40, 53],
                    iconAnchor: [20, 53]
                });
                let marker = L.marker([lat, long], {
                    icon: icon
                });
                marker.addTo(map);
                previousLayers.push(marker);
            });
            let polyline = L.polyline(Utils.arrayCheck(partners[selectedPartner]?.stops).map(({lat, long}) => {
                return [lat, long];
            }),{color: 'black'});
            polyline.addTo(map);
            previousLayers.push(polyline);
        },700);
    }else{
        map.setView([13.084622, 80.248357], 9);
    }
    return null;
}

function Dashboard(props) {
    const [stopSelected, setStop] = useState(0);
    const [state,setState] = useState({
        search: '',
        partners: Partners,
        selectedPartner: null
    });

    function updateStop(isLeft){
        if(isLeft){
            if(stopSelected===0){
                return;
            }
            setStop((prev) => {
                return prev-1});
            return;
        }
        const {partners,selectedPartner} = state;
        if(stopSelected===Utils.arrayCheck(partners[selectedPartner]?.stops).length-1){
            return;
        }
        setStop((prev) => prev+1);
    }

    function searchChange(e) {
        setState((prev) => {
            const newSearch = e.target.value;
            return {
                ...prev,
                search: newSearch,
                partners: Partners.filter((it) => it.name.toLowerCase().includes(newSearch.toLowerCase()) || it.partnerId.toLowerCase().includes(newSearch.toLowerCase()) || it.contact.toLowerCase().includes(newSearch.toLowerCase()) || it.status.toLowerCase().includes(newSearch.toLowerCase()))
            };
        });
    }

    function onPartnerClick(i){
        props.closePartnerDetailsPage();
        setState((prev) => {
            return {
                ...prev,
                selectedPartner: i
            };
        });
    }

    const {search, partners, selectedPartner} = state;
    const {isAllPartnersPage} = props;

    return <>
        <div className={styles.dashboard}>
            <div className={`row no-gutters justify-content-center`}>
                <div className={`col-xl-2 col-md-3 ${isAllPartnersPage?'col-12':'d-none d-sm-block'} ${styles.sideBar} bg-light-grey`}>
                    <input className={`${styles.partnerSearch} w-100 pl-3 p-2 border-none bg-light-grey`} placeholder="&#xF002; Search Partners" type="text" value={search} onChange={searchChange} style={{fontFamily: 'Arial, FontAwesome'}} />
                    {partners.map(({name, partnerId, contact, status, stops},index) => {
                        return <div className={`row no-gutters align-items-center pointer px-2 pl-3 border py-3 ${selectedPartner===index ? 'bg-fade-yellow' : 'bg-white'}`} key={`${index}${name}`}
                            onClick={() => onPartnerClick(index)}
                        >
                            <div className="col-xl-11 col-md-11 col-10">
                                <p className="m-0 fs-16 fw-600">
                                    {name}
                                </p>
                                <p className="m-0 fs-12 fw-600 grey-text">
                                    {partnerId} | {contact}
                                </p>
                                <div className="row no-gutters mt-2 align-items-center">
                                    <div className={`rounded-circle ${status==='idle'?styles.idle:status==='inactive'?styles.inactive:styles.active}`}>
                                    </div>
                                    <p className="m-0 fs-12 fw-600 pl-2">
                                        {status==='idle'?'IDLE':status==='inactive'?"INACTIVE":`VISIT ${status}`}
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-1 col-md-1 col-auto">
                                <img src={right} alt="right arrow" />
                            </div>
                        </div>
                    })}
                </div>
                <div className={`col-xl-10 ${isAllPartnersPage ? 'd-none' : 'col-12'} d-md-block col-sm-9 p-2 p-sm-4 bg-ligght-grey ${styles.partnerDetails}`}>
                    <p className="mb-3 m-0 fs-16 fw-600">
                        PARTNER DETAILS
                    </p>
                    <div className="row no-gutters bg-white p-3 border justify-content-center justify-sm-content-between mb-3 align-items-center">
                        <div className="col-xl-9 col-lg-9 col-md-10 col-sm-6 col-12">
                            <div className="row no-gutters word-break">
                                <div className="col-xl-3 col-lg-4 col-md-5 col-7 mb-2">
                                    <p className="m-0 fs-12 fw-600 grey-text">
                                        NAME
                                    </p>
                                    <p className="m-0 fs-16 fw-600 pr-2">
                                        {partners[selectedPartner]?.name}
                                    </p>
                                </div>
                                <div className="col-xl-3 col-lg-8 col-md-7 col-5 order-lg-4 order-xl-2 mb-2">
                                    <p className="m-0 fs-12 fw-600 grey-text">
                                        PARTNER ID
                                    </p>
                                    <p className="m-0 fs-16 fw-600 pr-2">
                                        {partners[selectedPartner]?.partnerId}
                                    </p>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-5 col-7 order-lg-3 order-xl-3 mb-2">
                                    <p className="m-0 fs-12 fw-600 grey-text">
                                        MOBILE NUMBER
                                    </p>
                                    <p className="m-0 fs-16 fw-600 pr-2">
                                        {partners[selectedPartner]?.contact}
                                    </p>
                                </div>
                                <div className="col-xl-3 col-lg-8 col-md-7 col-5 order-lg-2 order-xl-4 mb-2">
                                    <p className="m-0 fs-12 fw-600 grey-text">
                                        STATUS
                                    </p>
                                    <div className="d-flex align-items-center">
                                        {partners[selectedPartner] && <div className={`rounded-circle ${partners[selectedPartner]?.status==='idle'?styles.idle:partners[selectedPartner]?.status==='inactive'?styles.inactive:styles.active}`} />}
                                        <p className="m-0 fs-16 fw-600 ml-2 pr-2">
                                            {partners[selectedPartner]?.status==='idle'?'IDLE':partners[selectedPartner]?.status==='inactive'?"INACTIVE":partners[selectedPartner]?.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-2 col-6 d-flex justify-content-center">
                            {partners[selectedPartner] && <Button
                                className={`fs-12 fw-600 bg-yellow border-radius-20 py-2 ${styles.call}`}
                                text="Call Partner"
                            />}
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <MapContainer
                            scrollWheelZoom={false}
                        >
                            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                            <MapUpdater partners={partners} selectedPartner={selectedPartner} />
                        </MapContainer>
                    </div>
                    <div className="row no-gutters mt-3 word-break justify-content-between align-items-center">
                        <div className="col-auto" onClick={() => updateStop(true)}>
                            <img className="d-block d-sm-none" src={left} alt="left icon" />
                        </div>
                        {Utils.arrayCheck(partners[selectedPartner]?.stops).map(({lat, long, time}, index) => {
                            return <div className={`${stopSelected!==index ? 'd-none' : 'd-block'} d-sm-block col-10 col-sm-6  mb-sm-3 ${index%2===0 ? 'pr-sm-1' : 'pl-sm-1'}`} key={index}>
                                <div className="row no-gutters w-100 border bg-white px-3 py-2">
                                    <div className="col-xl-2 col-6">
                                        <p className="m-0 fs-12 fw-600 grey-text">
                                            STOP NO.
                                        </p>
                                        <p className="m-0 fs-16 fw-600 pr-3">
                                            {index+1}
                                        </p>
                                    </div>
                                    <div className="col-xl-7 col-12 order-xl-2 order-3">
                                        <div className="row no-gutters">
                                            <div className="col-6">
                                                <p className="m-0 fs-12 fw-600 grey-text">
                                                    LAT
                                                </p>
                                                <p className="m-0 fs-16 fw-600 pr-3">
                                                    {lat}
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p className="m-0 fs-12 fw-600 grey-text">
                                                    LONG
                                                </p>
                                                <p className="m-0 fs-16 fw-600 pr-3">
                                                    {long}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-6 order-xl-3 order-2">
                                        <p className="m-0 fs-12 fw-600 grey-text">
                                            TIME
                                        </p>
                                        <p className="m-0 fs-16 fw-600 pr-3">
                                            {time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        })}
                        <div className="col-auto" onClick={() => updateStop(false)}>
                            <img className="d-block d-sm-none" src={rightBigger} alt="right icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default withRouter(Dashboard);