import { Button, Card, Col, Radio, Row, Table, Typography } from 'antd'
import * as React from 'react'
import { Colors } from '../assets/colors/colors'
import Paragraph from "antd/lib/typography/Paragraph";
import { LuRefreshCw } from 'react-icons/lu';
import { now } from '../helpers/helper.all';
import { FaUsers } from 'react-icons/fa';
import { GoProjectTemplate } from 'react-icons/go';
import { cart } from '../components/subcomponents/subcomponents';
import { SiGooglemarketingplatform } from 'react-icons/si';
import { MdHealthAndSafety } from 'react-icons/md';
import { CiBank } from 'react-icons/ci';
import { onLoadAllCooperatives, onLoadAllLabos, onLoadAllMarkets, onLoadAllPharmacies, onLoadAllProject, onLoadAllUsers, onLoadAllUsersAlerts, onLoadAllUsersPerCategory, onLoadAllUsersVsisits } from '../helpers/helper.call';
import { appname } from '../appconstants/app.constants';

const { Title, Text } = Typography;
const { Column, ColumnGroup } = Table;

export const StatistiquesScreen = () => {

    const [users, setusers] = React.useState([])
    const [labos, setlabos] = React.useState([])
    const [projects, setprojects] = React.useState([])
    const [stores, setstores] = React.useState([])
    const [visits, setvisits] = React.useState([])
    const [alerts, setalerts] = React.useState([])
    const [markets, setmarkets] = React.useState([])
    const [pharmacies, setpharmacies] = React.useState([])
    const [cooperatives, setcooperatives] = React.useState([])
    const [isloading, setisloading] = React.useState(false)

    const count = [
        {
            today: "Utilisateurs",
            title: users.length,
            icon: <FaUsers color={Colors.whiteColor} />,
            bnb: "bnb2",
        },
        {
            today: "Utilisateurs Actifs",
            title: (users.length * 0.68).toFixed(0),
            persent: "+68%",
            icon: <FaUsers color={Colors.whiteColor} />,
            bnb: "bnb2",
        },
        // {
        //   today: "Projets encours",
        //   title: projects.length,
        //   // persent: "-20%",
        //   icon: <GoProjectTemplate color={Colors.whiteColor} />,
        //   bnb: "redtext",
        // },
        // {
        //   today: "Comptes marchand",
        //   title: stores.length,
        //   // persent: "10%",
        //   icon: cart,
        //   bnb: "bnb2",
        // },
        {
            today: "Marchés des produits apicoles",
            title: markets.length,
            // persent: "10%",
            icon: <SiGooglemarketingplatform />,
            bnb: "bnb2",
        },
        {
            today: "Dipositifs installés",
            title: (users.length * 0.75).toFixed(0),
            // persent: "10%",
            icon: <MdHealthAndSafety />,
            bnb: "bnb2",
        },
        {
            today: "Cooperatives apicoles",
            title: cooperatives.length,
            // persent: "10%",
            icon: <CiBank />,
            bnb: "bnb2",
        },
    ];

    const ___onLoadAll = async () => {
        setisloading(true)

        onLoadAllUsers({
            options: {
                pushoutmessage: true,
                limit: 10000,
                offset: 1
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    setusers(done)
                } else {
                    setusers([])
                }
            }
        })

        onLoadAllLabos({
            options: {
                pushoutmessage: true,
                limit: 10000,
                offset: 1
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    setlabos(done)
                } else {
                    setlabos([])
                }
            }
        })

        onLoadAllProject({
            options: {
                pushoutmessage: false,
                limit: 10000,
                offset: 1
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    setprojects(done)
                } else {
                    setprojects([])
                }
            }
        })

        onLoadAllUsersPerCategory({
            options: {
                idrole: 5,
                pushoutmessage: false,
                limit: 10000,
                offset: 1
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    setstores(done)
                } else {
                    setstores([])
                }
            }
        })

        onLoadAllUsersVsisits({
            options: {
                limit: 10000,
                offset: 1,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setvisits(done)
                } else {
                    setvisits([])
                }
            }
        })

        onLoadAllUsersAlerts({
            options: {
                limit: 10000,
                offset: 1,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setalerts(done)
                } else {
                    setalerts([])
                }
            }
        })

        onLoadAllPharmacies({
            options: {
                limit: 10000,
                offset: 1,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setpharmacies(done)
                } else {
                    setpharmacies([])
                }
            }
        })

        onLoadAllMarkets({
            options: {
                limit: 10000,
                offset: 1,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setmarkets(done)
                } else {
                    setmarkets([])
                }
            }
        })

        onLoadAllCooperatives({
            options: {
                limit: 10000,
                offset: 1,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setcooperatives(done)
                } else {
                    setcooperatives([])
                }
            }
        })
    }

    const onChange = async () => {

    }

    React.useEffect(() => {
        ___onLoadAll()
    }, [])

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="project-ant">
                            <div>
                                <Title level={5}>Synthèse des statistiques</Title>
                                <Paragraph className="lastweek">
                                    Statistiques et synthèses des informations {appname} | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
                            </div>
                            <div className="">

                            </div>
                            <div className="ant-filtertabs">
                                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        {/* <Radio.Button value="a" type='primary' style={{ background: Colors.primaryColor, color: Colors.whiteColor }} onClick={() => setadd(true)} >
                                    <LuPlus style={{ marginRight: 10, color: Colors.whiteColor }} />
                                    Ajouter un utilisateur
                                </Radio.Button> */}
                                        <Radio.Button value="b" onClick={() => ___onLoadAll()}>
                                            <LuRefreshCw style={{ marginRight: 10 }} />
                                            Actualiser la liste
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row className="rowgap-vbox" gutter={[24, 24]}>
                <Col span={24} md={24} >
                    <Row gutter={[24, 0]}>
                        {count.map((c, index) => (
                            <Col
                                span={24}
                                key={index}
                                md={12}
                                className="mb-24"
                            >
                                <Card bordered={false} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" gutter={[24, 24]}>
                                            <Col xs={18}>
                                                <span>{c.today}</span>
                                                <Title level={3}>
                                                    {c.title} <small className={c.bnb}>{c.persent}</small>
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="icon-box" style={{ background: Colors.primaryColor }}>{c.icon}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}