import { Button, Card, Col, Radio, Row, Table, Tabs, Typography } from 'antd'
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

export const NotificationsScreen = () => {

    const [users, setusers] = React.useState([])
    const [rd, setrd] = React.useState([])
    const [nrd, sentrd] = React.useState([])
    const [isloading, setisloading] = React.useState(false)

    const { TabPane } = Tabs;

    const ___onLoadAll = async () => {
        setisloading(true)

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
                                <Title level={5}>Notifications</Title>
                                <Paragraph className="lastweek">
                                    Liste des notifications {appname} | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
                            </div>
                            <div className="">

                            </div>
                            <div className="ant-filtertabs">
                                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                    <Radio.Group onChange={onChange} defaultValue="a">
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
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <Tabs
                            tabPosition={"left"}
                        // activeKey='1'
                        >
                            <TabPane
                                key={1}
                                tab={
                                    (
                                        <>
                                            <span>Non lues ( {nrd.length} )</span>
                                        </>
                                    )
                                }
                            >
                            </TabPane>
                            <TabPane
                                key={2}
                                tab={
                                    (
                                        <>
                                            <span>Lues ( {rd.length} )</span>
                                        </>
                                    )
                                }
                            >
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </>
    )
}