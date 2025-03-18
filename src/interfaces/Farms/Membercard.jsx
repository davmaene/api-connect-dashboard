import React, { useState } from 'react';
import { QRCodeSVG } from "qrcode.react";
import logo from "../../assets/images/Favicon-Mukulima_vert sombre.png";
import { Button } from 'antd';

export const BusinessCard = ({ current }) => {

    const [f, setf] = React.useState(true)
    const [info, setInfo] = useState({
        name: "David Maene",
        title: "Marketing Manager",
        phone: "+243 970 284 772",
        email: "hello@davidmaene.com",
        address: "Goma, NK RD Congo",
    });

    return (
        <div className="container">
            {f && (
                <div className="business-card front">
                    <div className="logo">COMPANY</div>
                    <div className="design-overlay"></div>
                    <div className="card-content">
                        <h1>{info.name}</h1>
                        <p className="title">{info.title}</p>
                        <p>📞 {info.phone}</p>
                        <p>📧 {info.email}</p>
                        <p>📍 {info.address}</p>
                        <div className="qr-code">
                            <QRCodeSVG value={`tel:${info.phone}`} size={50} />
                        </div>
                    </div>
                </div>
            )}
            {!f && (
                <div className="business-card back">
                    {/* <div className="logo">Mukulima Track</div>
                            <p className="slogan">Your Slogan Here</p>
                            <div className="design-overlay">
                                <img src={logo} alt="" srcset="" style={{ alignSelf: "center", objectFit: "contain" }} />
                            </div> */}
                </div>
            )}
            <Button
                type='primary'
                style={{
                    width: "100%"
                }}
                onClick={(e) => {
                    setf(!f)
                }}
            >
                <span>Changer la face {f ? "B" : "A"}</span>
            </Button>
        </div>
    );
}
