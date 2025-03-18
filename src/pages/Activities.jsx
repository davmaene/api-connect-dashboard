import * as React from 'react';
import { appname } from '../appconstants/app.constants';
import { Colors } from '../assets/colors/colors';
import { Card, Col, Radio, Row, Table, Typography } from 'antd';
import Paragraph from "antd/lib/typography/Paragraph";
import { LuRefreshCw } from 'react-icons/lu';
import { now } from '../helpers/helper.all';

const { Title, Text } = Typography;
const { Column, ColumnGroup } = Table;

export const ActivitiesScreen = () => {
    const [isloading, setisloading] = React.useState(false)
    const [list, setlist] = React.useState([])
    const onChange = async () => {

    }

    const __load = async () => {

    }

    React.useEffect(() => { }, [])
    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="project-ant">
                            <div>
                                <Title level={5}>Recentes activités ( {list.length} )</Title>
                                <Paragraph className="lastweek">
                                    Liste des activités {appname} | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
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
                                        <Radio.Button value="b" onClick={() => __load()}>
                                            <LuRefreshCw style={{ marginRight: 10 }} />
                                            Actualiser la liste
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className="ant-list-box table-responsive">
                            {/* <table className="width-100">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Catégorie</th>
                                    <th>Niveau de risque</th>
                                    <th>Etat de l'alerte</th>
                                    <th>Espèce de plante</th>
                                    <th>Déscription</th>
                                    <th>Utilisateur</th>
                                    <th>Labo</th>
                                    <th>Date d'alerte</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...list].map((l, index) => {
                                    const { user, img, level, espece, state, desc, labo, categ, date } = l
                                    return (
                                        <tr key={index}>
                                            <td>{img}</td>
                                            <td>{categ}</td>
                                            <td>{level}</td>
                                            <td>{state}</td>
                                            <td>{espece}</td>
                                            <td>{limitCharacters({ needlength: 20, string: desc })}</td>
                                            <td>{user}</td>
                                            <td>{labo}</td>
                                            <td>{date}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> */}
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}