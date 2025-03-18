import React from 'react'
import { AreaMap } from '@ant-design/maps';
import { googleAPIKey } from '../../appconstants/app.constants';
import GoogleMapReact from 'google-map-react';

export const ShowupfarminfosInterface = ({ current, cb }) => {
    console.log(current);

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    return (
        <>
            <div className="" style={{ height: 500 }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    {/* <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    /> */}
                </GoogleMapReact>
            </div>
        </>
    )
}