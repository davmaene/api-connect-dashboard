import React, { useState } from "react";

import {
    Row,
    Col,
    Card,
    Button,
    List,
    Descriptions,
    Avatar,
    Radio,
    Switch,
    Upload,
    message,
    Modal,
    Segmented,
    Flex
} from "antd";

import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
import { MdOutlinePrivacyTip } from "react-icons/md";

import BgProfile from "../assets/images/statics/Meteor-1.jpg";
import convesionImg from "../assets/images/team-2.jpg";
import convesionImg2 from "../assets/images/team-3.jpg";
import convesionImg3 from "../assets/images/team-4.jpg";
import convesionImg4 from "../assets/images/team-1.jpg";
import convesionImg5 from "../assets/images/team-2.jpg";
import project1 from "../assets/images/team-1.jpg";
import project2 from "../assets/images/team-2.jpg";
import project3 from "../assets/images/team-4.jpg";
import { pencil } from "../components/subcomponents/subcomponents";
import { retrieveSession } from "../helpers/helper.session";
import { routes } from "../helpers/helper.routes";
import { baseURL, defaultAvatar, endpoint } from "../appconstants/app.constants";
import { initialRoles, returnCurrentAvatar, returnCurrentRoles, returnCurrentUserName, rooms } from "../helpers/helper.all";
import { Colors } from "../assets/colors/colors";
import { MdModeEditOutline } from "react-icons/md";
import { canThisBeShowForThisUser, onChangeRoom } from "../helpers/helper.menus";
import { VscProject } from "react-icons/vsc";
import { onLoadAllProjectsByOwner } from "../helpers/helper.call";

export const ProfileScreen = () => {
    const [isloading, setisloading] = useState(false);
    const [user, setUser] = React.useState({});
    const [products, setproducts] = React.useState([])
    const [commandes, setcommandes] = React.useState([])
    const [projects, setprojects] = React.useState([
        {
            img: project1,
            titlesub: "Project #1",
            title: "Modern",
            disciption:
                "As Uber works through a huge amount of internal management turmoil.",
        },
        {
            img: project2,
            titlesub: "Project #2",
            title: "Scandinavian",
            disciption:
                "Music is something that every person has his or her own specific opinion about.",
        },
        {
            img: project3,
            titlesub: "Project #3",
            title: "Minimalist",
            disciption:
                "Different people have different taste, and various types of music, Zimbali Resort",
        },
    ])
    const history = useHistory()

    const data = [
        {
            title: "Sophie B.",
            avatar: convesionImg,
            description: "Hi! I need more information…",
        },
        {
            title: "Anne Marie",
            avatar: convesionImg2,
            description: "Awesome work, can you…",
        },
        {
            title: "Ivan",
            avatar: convesionImg3,
            description: "About files I can…",
        },
        {
            title: "Peterson",
            avatar: convesionImg4,
            description: "Have a great afternoon…",
        },
        {
            title: "Nick Daniel",
            avatar: convesionImg5,
            description: "Hi! I need more information…",
        },
    ];

    const __onLoadCommandes = async () => {

    }

    const __onLoadProjects = async () => {
        setisloading(true)
        onLoadAllProjectsByOwner({
            options: {
                limit: 10000,
                offset: 0,
                pushoutmessage: true
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    setisloading(done)
                } else {

                }
            }
        })
    }

    const _____loadCurrentUser = async () => {
        retrieveSession({
            callBack: (err, _user) => {
                if (_user) {
                    setUser(_user)
                } else history.replace(routes['signin'])
            }
        })
    };

    const onHandleToChangeRoom = (e) => {
        const allowed = canThisBeShowForThisUser({ roles: user, block: initialRoles['1'] })
        if (allowed === true) {
            onChangeRoom({
                event: e,
                e: 8498
            })
        } else {
            message.error("Désolé vous n'avez pas les droits pour passer en mode admin !")
            message.error("Contacter l'admin système pour ça")
        }
    }

    const __onLoadAllData = async () => {
        __onLoadCommandes()
        __onLoadProjects()
    }

    React.useEffect(() => {
        _____loadCurrentUser()
        __onLoadAllData()
    }, [])

    return (
        <>
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: "url(" + BgProfile + ")" }}
            />
            <Card
                className="card-profile-head"
                bodyStyle={{ display: "none" }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info p-3">
                            <Avatar.Group>
                                <Avatar size={70} shape="square" src={`${baseURL}/${returnCurrentAvatar({ userProfile: user })}`} style={{ width: "100%", padding: 5 }} />
                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">
                                        {returnCurrentUserName({ userProfile: user })}
                                    </h4>
                                    <p>
                                        {user && typeof user === "object" && user.hasOwnProperty("getPhone") && user.getPhone() ? user.getPhone() : "---"}
                                        {" "}|{" "}
                                        {user && typeof user === "object" && user.hasOwnProperty("getEmail") && user.getEmail() ? user.getEmail() : "---"}
                                    </p>
                                    <p style={{ color: Colors.primaryColor }}>
                                        {returnCurrentRoles({ userProfile: user })}
                                    </p>
                                </div>
                            </Avatar.Group>
                        </Col>
                        <Col
                            className="pr-4"
                            span={24}
                            md={12}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Radio.Group defaultValue="a">
                                <Radio.Button value="a">
                                    <MdModeEditOutline />
                                    <span style={{ marginLeft: 10 }} >Editer profile</span>
                                </Radio.Button>
                                <Radio.Button value="a"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onHandleToChangeRoom(e)
                                    }}
                                >
                                    <MdOutlinePrivacyTip />
                                    <span style={{ marginLeft: 10 }} >Passer en mode admin</span>
                                </Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                }
            ></Card>

            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h6 className="font-semibold m-0">Configuratioln d'accès</h6>}
                    >
                        <ul className="list settings-list">
                            {/* <li>
                                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
                            </li> */}
                            <li>
                                <Switch defaultChecked disabled />

                                <span>Agriculteur</span>
                            </li>
                            <li>
                                <Switch />
                                <span>Cherccheur</span>
                            </li>
                            <li>
                                <Switch />
                                <span>Visiteur</span>
                            </li>
                            <li>
                                <Switch />
                                <span>Investisseur</span>
                            </li>
                            <li>
                                <Switch />
                                <span>Marchand</span>
                            </li>
                            <li>
                                <Switch disabled defaultChecked={false} />
                                <span>Supeur admin</span>
                            </li>
                        </ul>
                    </Card>
                </Col>
                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Informations du profile</h6>}
                        className="header-solid h-full card-profile-information"
                        extra={<Button type="link" onClick={(e) => { alert(1) }}>{pencil}</Button>}
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <p className="text-dark">
                            {" "}
                            Bonjour je sui {returnCurrentUserName({ userProfile: user })}.{" "}
                        </p>
                        <hr className="my-25" />
                        <Descriptions title={returnCurrentUserName({ userProfile: user })}>
                            <Descriptions.Item label="Nom complet" span={3}>
                                {user && typeof user === "object" && user.hasOwnProperty("getNom") && user.getNom() ? user.getNom() : "---"}
                                {" "}
                                {user && typeof user === "object" && user.hasOwnProperty("getPostnom") && user.getPostnom() ? user.getPostnom() : "---"}
                                {" "}
                                {user && typeof user === "object" && user.hasOwnProperty("getPrenom") && user.getPrenom() ? user.getPrenom() : ""}
                            </Descriptions.Item>
                            <Descriptions.Item label="Téléphone" span={3}>
                                {user && typeof user === "object" && user.hasOwnProperty("getPhone") && user.getPhone() ? user.getPhone() : "---"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={3}>
                                {user && typeof user === "object" && user.hasOwnProperty("getEmail") && user.getEmail() ? user.getEmail() : "---"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Adresse" span={3}>
                                {user && typeof user === "object" && user.hasOwnProperty("getAdresse") && user.getAdresse() ? user.getAdresse() : "---"}
                            </Descriptions.Item>
                            {/* <Descriptions.Item label="Social" span={3}>
                                <a href="#pablo" className="mx-5 px-5">
                                    {<TwitterOutlined />}
                                </a>
                                <a href="#pablo" className="mx-5 px-5">
                                    {<FacebookOutlined style={{ color: "#344e86" }} />}
                                </a>
                                <a href="#pablo" className="mx-5 px-5">
                                    {<InstagramOutlined style={{ color: "#e1306c" }} />}
                                </a>
                            </Descriptions.Item> */}
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Mes commandes</h6>}
                        className="header-solid h-full"
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={[]}
                            split={true}
                            className="conversations-list"
                            renderItem={(item) => (
                                <List.Item actions={[<Button type="primary">Confirmer</Button>]}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar shape="square" size={48} src={item.avatar} />
                                        }
                                        title={item.title}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Card
                hidden
                style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['2'] }) ? 'block' : 'none' }}
                bordered={false}
                className="header-solid mb-24"
                title={
                    <>
                        <h6 className="font-semibold">Mes Projects</h6>
                        <p>Liste de projets</p>
                    </>
                }
            >
                <Row gutter={[24, 24]}>
                    {projects.map((p, index) => (
                        <Col span={24} md={12} xl={6} key={index}>
                            <Card
                                // bordered={true}
                                className="card-project"
                                cover={
                                    <div
                                        style={{ height: 100, width: "100%", display: "flex", background: Colors.pillColor, alignContent: "center", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <VscProject style={{ fontSize: 62, color: Colors.primaryColor, alignSelf: "center" }} />
                                    </div>
                                }
                            // {<img alt="example" src={p.img} />}
                            >
                                <div className="card-tag">{p.titlesub}</div>
                                <h5>{p.titile}</h5>
                                <p>{p.disciption}</p>
                                <Row gutter={[6, 0]} className="card-footer">
                                    <Col span={12}>
                                        <Button type="primary">Parcourir le projet</Button>
                                    </Col>
                                    <Col span={12} className="text-right">
                                        <Avatar.Group className="avatar-chips">
                                            <Avatar size="small" src={convesionImg} />
                                            <Avatar size="small" src={convesionImg2} />
                                            <Avatar size="small" src={convesionImg3} />
                                        </Avatar.Group>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    );
}
