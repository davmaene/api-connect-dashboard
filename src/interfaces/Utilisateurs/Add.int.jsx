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
import { onAddNewUser, onLoadAllLabos, onLoadAllProvinces, onLoadAllTerritoriesByProvinces, onLoadAllVillagesByTerritoire } from '../../helpers/helper.call';

const { Title } = Typography;
const { Option } = Select;

export const AddUserInterface = ({ cb }) => {

    const [isloading, setisloading] = React.useState(false);
    const [belongsToAssoc, setBelongsToAssoc] = React.useState(false);
    const [labs, setlabs] = React.useState([]);
    const [form] = Form.useForm();
    const history = useHistory();
    const [user, setUser] = React.useState({});
    const [villages, setvillages] = React.useState([]);
    const [territoires, setterritoires] = React.useState([]);
    const [provinces, setprovinces] = React.useState([]);

    const __handleFinish = async (vals) => {
        // _________fw({ user, action: ______crud['CREATE'] })
        if (1) {
            setisloading(true);
            const idvillage = vals && vals['idvillage'] ? vals['idvillage'].substring(0, vals['idvillage'].indexOf("|")) : 0;
            const idterritoire = vals && vals['idterritoire'] ? vals['idterritoire'].substring(0, vals['idterritoire'].indexOf("|")) : 0;
            const idprovince = vals && vals['idprovince'] ? vals['idprovince'].substring(0, vals['idprovince'].indexOf("|")) : 0;
            const idlabo = vals && vals['idlabo'] ? vals['idlabo'].substring(0, vals['idlabo'].indexOf("|")) : 0;

            const data = {
                ...vals,
                idvillage,
                idterritoire,
                idprovince,
                idlabo,
                idroles: idlabo ? [1, 2] : [1]
            }

            onAddNewUser({
                options: {
                    pushoutmessage: true
                },
                data,
                callback: (err, done) => {
                    setisloading(false)
                    if (done) {
                        message.success("Un nouvel utilsateur vient d'être ajouter avec succès !")
                        return cb(true)
                    } else {
                        message.error("Une erreur veint de se produire lors de l'ajout d'un utilisateur !")
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

        onLoadAllLabos({
            options: {
                limit: 1000,
                offset: 0,
                pushoutmessage: false
            },
            callback: (err, done) => {
                if (done) {
                    setlabs(done)
                } else {
                    setlabs([])
                }
            }
        })
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
                                        name="nom"
                                        label="Nom"
                                        rules={[
                                            { required: true, message: "Entrer le nom" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Nom" />
                                    </Form.Item>
                                </Col>
                                <Col span={8} md={8}>
                                    <Form.Item
                                        className='w-100'
                                        name="postnom"
                                        label="Postnom"
                                        rules={[
                                            { required: true, message: "Entrer le postnom" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Postnom" />
                                    </Form.Item>
                                </Col>
                                <Col span={8} md={8}>
                                    <Form.Item
                                        className='w-100'
                                        name="prenom"
                                        label="Prenom"
                                        rules={[
                                            { required: false, message: "Entrer le prenom" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Prenom" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]}>
                                <Col span={12} md={12} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="genre"
                                        label="Genre | Sexe"
                                        rules={[
                                            { required: true, message: "Séléctionner le sexe" },
                                        ]}
                                    >
                                        <Select size='large' placeholder="Séléctionner le sexe" >
                                            {genders.map((v, i) => {
                                                return (
                                                    <Option value={v && v['value']} >{v && v['label']}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="adresse"
                                        label="Adresse de résidence"
                                        rules={[
                                            { required: false, message: "Entrer l'Adresse de résidence" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Entrer l'Adresse de résidence" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]}>
                                <Col span={12} md={12} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="phone"
                                        label="Numéro de téléphone"
                                        rules={[
                                            { required: true, message: "Entrer le Numéro de téléphone" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Numéro de téléphone de l'agriculteur" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12}>
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="email"
                                        label="Adresse email"
                                        rules={[
                                            { required: false, message: "Entrer l'adresse mail" },
                                        ]}
                                    >
                                        <Input size='large' type='email' placeholder="Adresse mail de l'agriculteur" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={[24, 0]}>
                                <Col span={12} md={12}>
                                    <div className="mt-1">
                                        <Checkbox
                                            onChange={(e) => {
                                                setBelongsToAssoc(e.target.checked)
                                            }
                                            }
                                        >
                                            Appartient à un laboratoire ?
                                        </Checkbox>
                                        {belongsToAssoc &&
                                            (
                                                <Form.Item
                                                    className='w-100 pt-1'
                                                    name="idlabo"
                                                    // label="&nbsp;"
                                                    rules={[
                                                        { required: false, message: "Séléctionner un laboratoire " },
                                                    ]}
                                                >
                                                    <Select placeholder="Séléctionner un laboratoire" size='large' style={{ width: "100%" }}>
                                                        {labs.map((v, i) => {
                                                            return (
                                                                <Option value={`${v['id']}|${v['labo']}`} >{v && v['labo']}</Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            )
                                        }
                                    </div>
                                </Col>

                                <Col span={12} md={12} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="password"
                                        initialValue={randomLongNumber({ length: 8 })}
                                        label="Mot de passe de connexion"
                                        rules={[
                                            { required: true, message: "Entrer le mot de passe" },
                                        ]}
                                    >
                                        <Input disabled size='large' placeholder="Entrer le mot de passe de connexion" />
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
                                        name="idvillage"
                                        label="Séléctionner un village"
                                        rules={[
                                            { required: false, message: "Séléctionner un village" },
                                        ]}
                                    >
                                        <Select showSearch size='large' placeholder="Séléctionner un village" >
                                            {villages.map((v, i) => {
                                                return (
                                                    <Option value={`${v && v['id']}|${v && v['village']}|${JSON.stringify(v)}`} >{v && v['village']}</Option>
                                                )
                                            })}
                                        </Select>
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