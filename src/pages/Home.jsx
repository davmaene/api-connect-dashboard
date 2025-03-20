import React, { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

import { FaUsers } from "react-icons/fa";

import { Colors } from "../assets/colors/colors";
import { onLoadAllCooperatives, onLoadAllLabos, onLoadAllMarkets, onLoadAllPharmacies, onLoadAllProject, onLoadAllUsers, onLoadAllUsersAlerts, onLoadAllUsersPerCategory, onLoadAllUsersVsisits } from "../helpers/helper.call";
import { AreaMapAlert } from "../components/map/MapAlert";
import { MdRefresh } from "react-icons/md";
import { baseURL } from "../appconstants/app.constants";
import { SiGooglemarketingplatform } from "react-icons/si";
import { MdHealthAndSafety } from "react-icons/md";
import { CiBank } from "react-icons/ci";

export const HomeScreen = () => {
  const { Title, Text } = Typography;

  const [isloading, setisloading] = React.useState(false);
  const [users, setusers] = React.useState([])
  const [labos, setlabos] = React.useState([])
  const [projects, setprojects] = React.useState([])
  const [stores, setstores] = React.useState([])
  const [visits, setvisits] = React.useState([])
  const [alerts, setalerts] = React.useState([])
  const [markets, setmarkets] = React.useState([])
  const [pharmacies, setpharmacies] = React.useState([])
  const [cooperatives, setcooperatives] = React.useState([])

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
      title: (users.length * 0.18).toFixed(0),
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

  const list = Array.from(alerts).map(al => {

    const { image, category: ascateg, createdon, location, niveaurisque, status, idlabo, __tbl_espece, __tbl_user, description, createdonunix, __tbl_categoryalert, __tbl_laboratory } = al
    const { espece } = __tbl_espece || {};
    const { nom, postnom } = __tbl_user || {};
    const { category } = __tbl_categoryalert || {};
    const { labo } = __tbl_laboratory || {};

    return {
      img: <img src={`${baseURL}/${image}`} style={{ width: 30 }} />,
      categ: category,
      level: niveaurisque,
      user: `${nom} ${postnom}`,
      espece: espece,
      state: status,
      desc: description,
      labo: labo,
      date: createdon,
    }
  })

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

  React.useEffect(() => {
    ___onLoadAll()
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 24]}>
          <Col span={24} md={14} style={{ marginBottom: 20 }}>
            <Card bordered={false} className="criclebox h-full" style={{}}>
              <AreaMapAlert key={902029} />
            </Card>
          </Col>

          <Col span={24} md={10} >
            <Row gutter={[24, 0]}>
              <Col span={24} md={24} style={{ marginBottom: 25 }} >
                <Card bordered={false} className="criclebox " style={{ background: Colors.primaryColor }}>
                  <Row gutter={[24, 24]}>
                    <Col span={24} md={19} >
                      <div>
                        <Title level={4} style={{ color: Colors.whiteColor }} >Synthèse des activités</Title>
                        <Paragraph className="lastweek">
                          Statistiques et synthèses des informations
                        </Paragraph>
                      </div>
                    </Col>
                    <Col md={5} style={{ flexDirection: "row-reverse", alignContent: "flex-end", alignItems: "flex-end", justifyContent: "flex-end" }} >
                      <div className="" style={{ alignSelf: "end", right: 0 }}>
                        <Button.Group>
                          <Button
                            type="default"
                            onClick={() => {
                              ___onLoadAll()
                            }}
                          >
                            <MdRefresh />
                            <span>Actualiser</span>
                          </Button>
                          {/* <Button>
                            <span>Actualiser</span>
                          </Button> */}
                        </Button.Group>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
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
        {/* 
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <EChart data={{ users, stores, projects, labos, visites: visits }} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart data={{ visits, users }} />
            </Card>
          </Col>
        </Row> 
        */}
      </div>
    </>
  );
}
