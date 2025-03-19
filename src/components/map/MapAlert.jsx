import React, { useState, useEffect } from 'react';
import { AreaMap } from '@ant-design/maps';
// import d from '../../assets/static/geojson.json'
import { drcdata } from '../../assets/static/poligon.data';

export const AreaMapAlert = () => {
    const d = drcdata
    const [data, setData] = useState({ ...d });
    useEffect(() => {
        // asyncFetch();
    }, []);

    //   const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json')
    //       .then((response) => response.json())
    //       .then((json) => setData(json))
    //       .catch((error) => {
    //         console.log('fetch data failed', error);
    //       });
    //   };

    const config = {
        map: {
            type: 'mapbox',
            style: 'blank',
            center: [120.19382669582967, 30.258134],
            zoom: 3,
            pitch: 0,
        },
        source: {
            data: data,
            parser: {
                type: 'geojson',
            },
        },
        autoFit: true,
        color: {
            field: 'POPULATION',
            value: ['rgb(255,255,241)', 'rgb(239,243,255)', 'rgb(255, 200, 30)', 'rgb(22,110,6)', 'rgb(255,123,0)'],
            scale: {
                type: 'quantile',//173,188,170
            },
        },
        style: {
            height: 500,
            opacity: 1,
            stroke: 'rgb(93,112,146)',
            lineWidth: 0.6,
            lineOpacity: 1,
        },
        state: {
            active: true,
        },
        label: {
            visible: true,
            field: 'NOM',
            style: {
                fill: '#000',
                opacity: 0.8,
                fontSize: 10,
                stroke: '#fff',
                strokeWidth: 1.5,
                textAllowOverlap: false,
                padding: [5, 5],
            },
        },
        tooltip: {
            items: ['POPULATION', 'NOM'],
        },
        zoom: {
            position: 'bottomright',
        },
        legend: {
            position: 'bottomleft',
        },
    };

    return (
        <div className="" style={{ height: 500 }}>
            <AreaMap {...config} />
        </div>
    );
};