import * as React from 'react';
import {
    Form,
    Input,
    Button,
    Card,
    Row,
    Typography,
    Select,
    Col,
    Divider,
    Checkbox,
    DatePicker,
    message
} from 'antd';
import { ______crud, genders, onFinishFailed, randomLongNumber } from '../../helpers/helper.all';
import { __globalID } from '../../helpers/helper.userprofile';
import { retrieveSession } from '../../helpers/helper.session';
import { Link, useLocation, useHistory } from "react-router-dom";
import { routes } from '../../helpers/helper.routes';
import { _________fw } from '../../helpers/helper.handleaction';
import { onAddNewLabo, onAddNewUser, onLoadAllLabos, onLoadAllProvinces, onLoadAllTerritoriesByProvinces, onLoadAllUsers, onLoadAllVillagesByTerritoire } from '../../helpers/helper.call';

const { Title } = Typography;
const { Option } = Select;

export const AddLaboInterface = ({ cb }) => {

    const [isloading, setisloading] = React.useState(false);
    const [belongsToAssoc, setBelongsToAssoc] = React.useState(false);
    const [labs, setlabs] = React.useState([]);
    const [form] = Form.useForm();
    const history = useHistory();
    const [user, setUser] = React.useState({});
    const [villages, setvillages] = React.useState([]);
    const [territoires, setterritoires] = React.useState([]);
    const [provinces, setprovinces] = React.useState([]);
    const [users, setusers] = React.useState([]);

    const __handleFinish = async (vals) => {
        // _________fw({ user, action: ______crud['CREATE'] })
        if (1) {
            setisloading(true);
            // const idvillage = vals && vals['idvillage'] ? vals['idvillage'].substring(0, vals['idvillage'].indexOf("|")) : 0;
            const idterritoire = vals && vals['idterritoire'] ? vals['idterritoire'].substring(0, vals['idterritoire'].indexOf("|")) : 0;
            const idprovince = vals && vals['idprovince'] ? vals['idprovince'].substring(0, vals['idprovince'].indexOf("|")) : 0;
            const idresponsable = vals && vals['idresponsable'] ? vals['idresponsable'].substring(0, vals['idresponsable'].indexOf("|")) : 0;

            const data = {
                ...vals,
                idterritoire: parseInt(idterritoire),
                idprovince: parseInt(idprovince),
                idresponsable: parseInt(idresponsable),
            }

            onAddNewLabo({
                options: {
                    pushoutmessage: true
                },
                data,
                callback: (err, done) => {
                    setisloading(false)
                    if (done) {
                        message.success("Un nouvel élément vient d'être ajouté!")
                        return cb(true)
                    } else {
                        message.error("Une erreur veint de se produire lors de l'ajout d'un élément !")
                        return cb(false)
                    }
                }
            })

        }
    };

    const _____onLoadInfos = async () => {

        setisloading(true);
        onLoadAllProvinces({
            options: {}, callBack: (err, done) => {
                if (done) {
                    setisloading(false)
                    setprovinces(done)
                } else {
                    setisloading(false)
                    setprovinces([])
                }
            }
        });

        onLoadAllUsers({
            options: {
                limit: 1000,
                offset: 0,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setusers(done)
                } else {
                    setusers([])
                }
            }
        });
    };

    const __onLoadVillages = async ({ index }) => {
        index = index.substring(0, index.indexOf("|"));
        onLoadAllVillagesByTerritoire({
            options: {}, index: index, callBack: (err, done) => {
                if (done) {
                    setisloading(false)
                    setvillages(done)
                } else {
                    setisloading(false)
                    setvillages([])
                }
            }
        });
    };

    const __onLoadTerritoires = async ({ index }) => {
        index = index.substring(0, index.indexOf("|"));
        onLoadAllTerritoriesByProvinces({
            options: {}, index: index, callBack: (err, done) => {
                if (done) {
                    setisloading(false)
                    setterritoires(done)
                } else {
                    setisloading(false)
                    setterritoires([])
                }
            }
        });
    };

    const _____loadCurrentUser = async () => {
        retrieveSession({
            callBack: (err, _user) => {
                if (_user) {
                    setUser(_user)
                } else history.replace(routes['signin'])
            }
        })
    };

    React.useEffect(() => {
        _____loadCurrentUser()
        _____onLoadInfos()
    }, []);

    return (
        <>
            <Card style={{}} className="my-4">
                <Row gutter={[24, 24]}>
                    {/* <Col span={24} md={24}>
                        <Title style={{ fontSize: 20 }}>Ajout agriculteur</Title>
                        <p>Formulaire d'ajout d'un nouvel agriculteur</p>
                        <Divider />
                    </Col> */}
                    <Col span={24} lg={24}>
                        <Form
                            form={form}
                            title={"Form"}
                            layout='vertical'
                            name="basic"
                            onFinish={__handleFinish}
                            onFinishFailed={onFinishFailed}
                            className="row-col col-lg-12"
                        >
                            <Row gutter={[24, 0]}>
                                <Col span={8} md={8} >
                                    <Form.Item
                                        className='w-100'
                                        name="labo"
                                        label="Nom du laboratoire"
                                        rules={[
                                            { required: true, message: "Entrer le nom" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Nom du labo" />
                                    </Form.Item>
                                </Col>
                                <Col span={8} md={8}>
                                    <Form.Item
                                        className='w-100'
                                        name="description"
                                        label="Description"
                                        rules={[
                                            { required: true, message: "Entrer la description" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="description" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="idresponsable"
                                        label="Responsable du labo"
                                        rules={[
                                            { required: true, message: "Séléctionner le responsable" },
                                        ]}
                                    >
                                        <Select size='large' placeholder="Séléctionner le responsable" >
                                            {users.map((v, i) => {
                                                return (
                                                    <Option value={`${v['id']}|${v['nom']} ${v['postnom']}`} >{`${v['nom']} ${v['postnom']} | ${v['phone']}`}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]}>
                                <Col span={12} md={8} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="idprovince"
                                        label="Province"
                                        rules={[
                                            { required: false, message: "Séléctionner la province" },
                                        ]}
                                    >
                                        <Select showSearch size='large' placeholder="Séléctionner la province" onSelect={e => { __onLoadTerritoires({ index: e }) }} >
                                            {provinces.map((v, i) => {
                                                return (
                                                    <Option value={`${v && v['id']}|${v && v['province']}`} >{v && v['province']}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8}>
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="idterritoire"
                                        label="Territoire"
                                        rules={[
                                            { required: false, message: "Séléctionner une territoire" },
                                        ]}
                                    >
                                        <Select showSearch size='large' placeholder="Séléctionner la territoire" onSelect={e => { __onLoadVillages({ index: e }) }} >
                                            {territoires.map((v, i) => {
                                                return (
                                                    <Option value={`${v && v['id']}|${v && v['territoire']}`} >{v && v['territoire']}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="adresse"
                                        label="Adresse physique"
                                        rules={[
                                            { required: false, message: "Entrer l'Adresse physique" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Entrer l'Adresse physique" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button
                                    style={{ width: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isloading}
                                >
                                    <span>Enregistrer</span>
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    )
}