import * as React from 'react';

import { Menu, Button, Modal, Divider } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoIosCog, IoIosNotifications } from "react-icons/io";
import { MdList, MdLocalActivity, MdOutlineLocalActivity } from "react-icons/md";
import { FaChartBar, FaCogs, FaList } from "react-icons/fa";
import { Colors } from '../../assets/colors/colors';
import { dashboard } from '../subcomponents/subcomponents';
import { canThisBeShowForThisUser, features } from '../../helpers/helper.menus';
import { initialRoles, randomLongNumber } from '../../helpers/helper.all';
import { routes } from '../../helpers/helper.routes';

export const DashboardMenus = ({ user, appkey }) => {

    const { pathname } = useLocation();
    const history = useHistory();
    const page = pathname.substring(pathname.lastIndexOf("/") + 1) // || pathname.replace("/", "");
    const SubMenu = Menu.SubMenu;
    const color = Colors.primaryColor;

    return (
        <>
            <Menu theme="light" mode="inline">
                <Menu.Item key="1">
                    <NavLink to={routes['dashboard']}>
                        <span
                            className="icon"
                            style={{
                                background: page === "dashboard" ? color : "",
                            }}
                        >
                            {dashboard({ color })}
                        </span>
                        <span className="label">Tableau de bord</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
            {/* ===== Autres vue d'ensemble==== */}
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['overview']}
            >
                <SubMenu
                    key={'overview'}
                    style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['3'] }) ? 'block' : 'none' }}
                    title={<strong style={{ textTransform: "uppercase", color: Colors.darkColor }}>Vue d'ensemble</strong>}
                >
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['statistics']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "statistics" ? color : "",
                                }}
                            >
                                <FaChartBar color={color} />
                            </span>
                            <span className="label">Statistiques</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['activites']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "activities" ? color : "",
                                }}
                            >
                                <MdOutlineLocalActivity color={color} />
                            </span>
                            <span className="label">Activités</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['notifications']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "notifications" ? color : "",
                                }}
                            >
                                <IoIosNotifications color={color} />
                            </span>
                            <span className="label">Notifications</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            {/* ===== Listing ==== */}
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['listing']}
            >
                <SubMenu
                    level={3}
                    key={'listing'}
                    style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['3'] }) ? 'block' : 'none' }}
                    title={<strong style={{ textTransform: "uppercase", color: Colors.darkColor }}>Listes </strong>}
                >
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['users']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "utilisateurs" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Utilisateurs</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['labos']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "laboratoires" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Laboratoires</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['products']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "produits" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Produits </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['projects']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "projects" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Projets </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['marches']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "marches" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Marchés </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['cooperatives']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "cooperatives" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Coopératives </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['pharmacies']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "pharmacies" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Pharmacies </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['champs']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "champs" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Champs </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['villages']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "villages" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Villages </span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            <Divider />
            {/* ===== Autres routes for all users ==== */}
        </>
    )
}

export const SokoMenus = ({ user, appkey }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const page = pathname.substring(pathname.lastIndexOf("/") + 1) // || pathname.replace("/", "");
    const SubMenu = Menu.SubMenu;
    const color = Colors.primaryColor;

    return (
        <>
            <Menu theme="light" mode="inline">
                <Menu.Item key="1">
                    <NavLink to={routes['dashboard']}>
                        <span
                            className="icon"
                            style={{
                                background: page === "dashboard" ? color : "",
                            }}
                        >
                            {dashboard({ color })}
                        </span>
                        <span className="label">Tableau de bord</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
            {/* ===== Autres vue d'ensemble==== */}
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['overview']}
            >
                <SubMenu
                    key={'overview'}
                    style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['3'] }) ? 'block' : 'none' }}
                    title={<strong style={{ textTransform: "uppercase", color: Colors.darkColor }}>Vue d'ensemble</strong>}
                >
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['statistics']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "statistics" ? color : "",
                                }}
                            >
                                <FaChartBar color={color} />
                            </span>
                            <span className="label">Stock</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['activites']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "activities" ? color : "",
                                }}
                            >
                                <MdOutlineLocalActivity color={color} />
                            </span>
                            <span className="label">Commandes</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['notifications']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "notifications" ? color : "",
                                }}
                            >
                                <IoIosNotifications color={color} />
                            </span>
                            <span className="label">Notifications</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            {/* ===== Listing ==== */}
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['listing']}
            >
                <SubMenu
                    level={3}
                    key={'listing'}
                    style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['3'] }) ? 'block' : 'none' }}
                    title={<strong style={{ textTransform: "uppercase", color: Colors.darkColor }}>Listes </strong>}
                >
                    {/* <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['users']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "utilisateurs" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Utilisateurs</span>
                        </NavLink>
                    </Menu.Item> */}
                    {/* ========================================= */}
                    {/* <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['labos']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "laboratoires" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Laboratoires</span>
                        </NavLink>
                    </Menu.Item> */}
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['products']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "produits" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Produits </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    {/* <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['projects']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "projects" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Projets </span>
                        </NavLink>
                    </Menu.Item> */}
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['marches']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "marches" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Marchés </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['cooperatives']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "cooperatives" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Coopératives </span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['pharmacies']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "pharmacies" ? color : "",
                                }}
                            >
                                <FaList color={color} />
                            </span>
                            <span className="label">Pharmacies </span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            <Divider />
            {/* ===== Autres routes for all users ==== */}
        </>
    )
}

export const InvestementMenus = ({ user, appkey }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const page = pathname.substring(pathname.lastIndexOf("/") + 1) // || pathname.replace("/", "");
    const SubMenu = Menu.SubMenu;
    const color = Colors.primaryColor;

    return (
        <>
            <Menu theme="light" mode="inline">
                <Menu.Item key="1">
                    <NavLink to={routes['dashboard']}>
                        <span
                            className="icon"
                            style={{
                                background: page === "dashboard" ? color : "",
                            }}
                        >
                            {dashboard({ color })}
                        </span>
                        <span className="label">Tableau de bord</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
            {/* ===== Autres vue d'ensemble==== */}
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['overview']}
            >
                <SubMenu
                    key={'overview'}
                    style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['3'] }) ? 'block' : 'none' }}
                    title={<strong style={{ textTransform: "uppercase", color: Colors.darkColor }}>Vue d'ensemble</strong>}
                >
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['activites']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "activities" ? color : "",
                                }}
                            >
                                <MdOutlineLocalActivity color={color} />
                            </span>
                            <span className="label">Projets en cours</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                    <Menu.Item key={randomLongNumber({ length: 6 })}>
                        <NavLink to={routes['notifications']}>
                            <span
                                className="icon"
                                style={{
                                    background: page === "notifications" ? color : "",
                                }}
                            >
                                <IoIosNotifications color={color} />
                            </span>
                            <span className="label">Mes projets</span>
                        </NavLink>
                    </Menu.Item>
                    {/* ========================================= */}
                </SubMenu>
            </Menu>
            {/* ===== Listing ==== */}
            <Divider />
            {/* ===== Autres routes for all users ==== */}
        </>
    )
}

export const LaboratoiryMenus = ({ user, appkey }) => {
    return <></>
}

export const BuildMenusApp = ({ appkey, user }) => {
    const menu = features({
        appKey: appkey,
        user
    })
    const { appid, name, allowedto, menus } = menu;
    return menus
}