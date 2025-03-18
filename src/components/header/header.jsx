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
import { profile, signin, signup, template } from '../../subcomponents/subcomponents';
import { appname } from '../../appconstants/app.constants';
import { Colors } from '../../assets/colors/colors';
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export const HeaderComponent = () => {
    return(
        <Header>
            <div className="header-col header-brand">
                <h5>{appname}</h5>
            </div>
            <div className="header-col header-nav">
                <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                    <Link to="/dashboard">
                        {template}
                        <span> Dashboard</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Link to="/profile">
                        {profile}
                        <span>Profile</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <Link to="/sign-up">
                        {signup}
                        <span> Sign Up</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                    <Link to="/sign-in">
                        {signin}
                        <span> Sign In</span>
                    </Link>
                    </Menu.Item>
                </Menu>
            </div>
            {/* <div className="header-col header-btn">
                <Button type="primary" style={{ backgroundColor: Colors.primaryColor, borderColor: Colors.primaryColor }}></Button>
            </div> */}
        </Header>
    )
}