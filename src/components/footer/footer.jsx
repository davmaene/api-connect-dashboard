import * as React from 'react';
import { Link } from "react-router-dom";
import {
    Layout,
    Menu,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Switch,
} from "antd";
import { appcompanyname, appname } from '../../appconstants/app.constants';
import { Colors } from '../../assets/colors/colors';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export const FooterComponent = () => {
    return (
        <Footer
            style={{ position: "fixed", bottom: 0, background: Colors.pillColor, paddingTop: 10, width: "100%" }}
        >
            <Menu mode="horizontal" hidden>
                <Menu.Item>Company</Menu.Item>
                <Menu.Item>A propos de nous</Menu.Item>
                <Menu.Item>Teams</Menu.Item>
                <Menu.Item>Market</Menu.Item>
                <Menu.Item>Admin</Menu.Item>
            </Menu>
            <p className="copyright text-center">
                {" "}
                Copyright © {new Date().getFullYear()} {appname} by <a target={"_blank"} href="https://apiconnect.tech">{appcompanyname}</a>.{" "}
            </p>
        </Footer>
    )
}