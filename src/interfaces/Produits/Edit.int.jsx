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
    message,
    Upload
} from 'antd';
import { ______crud, currencies, genders, onFinishFailed, randomLongNumber } from '../../helpers/helper.all';
import { __globalID } from '../../helpers/helper.userprofile';
import { retrieveSession } from '../../helpers/helper.session';
import { Link, useLocation, useHistory } from "react-router-dom";
import { routes } from '../../helpers/helper.routes';
import { _________fw } from '../../helpers/helper.handleaction';
import { onAddNewLabo, onAddNewProducts, onAddNewUser, onLoadAllCategories, onLoadAllLabos, onLoadAllProvinces, onLoadAllTerritoriesByProvinces, onLoadAllUnities, onLoadAllUsers, onLoadAllVillagesByTerritoire } from '../../helpers/helper.call';
import { UploadOutlined } from '@ant-design/icons';
import { endpoint } from '../../appconstants/app.constants';

const { Title } = Typography;
const { Option } = Select;

export const EditProductsInterface = ({ cb, current }) => {

    const [isloading, setisloading] = React.useState(false);
    const [form] = Form.useForm();
    const history = useHistory();
    const [user, setUser] = React.useState({});
    const [categs, setcategs] = React.useState([]);
    const [unities, setunities] = React.useState([]);
    const [users, setusers] = React.useState([]);

    const props = {
        action: endpoint,
        beforeUpload(file) {
            return false;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const __handleFinish = async (vals) => {
        // _________fw({ user, action: ______crud['CREATE'] })
        if (1) {
            setisloading(true);
            const idcategory = vals && vals['idcategory'] ? vals['idcategory'].substring(0, vals['idcategory'].indexOf("|")) : 0;
            const idmesure = vals && vals['idcategory'] ? vals['idcategory'].substring(0, vals['idcategory'].indexOf("|")) : 0;
            const { price_max, price_min } = vals;

            const data = {
                ...vals,
                price_max: parseFloat(price_max),
                price_min: parseFloat(price_min),
                idmesure: parseInt(idmesure),
                idcategory: parseInt(idcategory)
            }

            onAddNewProducts({
                options: {
                    pushoutmessage: true
                },
                data: data,
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
        onLoadAllCategories({
            options: {},
            callBack: (err, done) => {
                if (done) {
                    setisloading(false)
                    setcategs(done)
                } else {
                    setisloading(false)
                    setcategs([])
                }
            }
        });

        onLoadAllUnities({
            options: {},
            callBack: (err, done) => {
                if (done) {
                    setisloading(false)
                    setunities(done)
                } else {
                    setisloading(false)
                    setunities([])
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
                                        name="produit"
                                        initialValue={current && current['produit']}
                                        label="Nom du produit"
                                        rules={[
                                            { required: true, message: "Entrer le nom" },
                                        ]}
                                    >
                                        <Input size='large' placeholder="Nom du produit" />
                                    </Form.Item>
                                </Col>
                                <Col span={8} md={8}>
                                    <Form.Item
                                        className='w-100'
                                        name="description"
                                        label="Description"
                                        initialValue={current && current['description']}
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
                                        name="idcategory"
                                        label="Categorie du produit"
                                        initialValue={current && current['idcategory']}
                                        rules={[
                                            { required: true, message: "Séléctionner la Categorie" },
                                        ]}
                                    >
                                        <Select showSearch size='large' placeholder="Séléctionner la Categorie" >
                                            {[...categs].map((v, i) => {
                                                return (
                                                    <Option value={`${v['id']}|${v['category']}`} >{`${v['category']}`}</Option>
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
                                        name="price_min"
                                        label="Prix minimum"
                                        initialValue={current && current['price_min']}
                                        rules={[
                                            { required: true, message: "Entrer le prix minimum" },
                                        ]}
                                    >
                                        <Input type='number' size='large' placeholder="Entrer le prix minimum" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8}>
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="price_max"
                                        label="Prix maximum"
                                        initialValue={current && current['price_max']}
                                        rules={[
                                            { required: true, message: "Entrer le prix minimum" },
                                        ]}
                                    >
                                        <Input type='number' size='large' placeholder="Entrer le prix maximum" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8} >
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="currency"
                                        label="Devise"
                                        initialValue={current && current['currency']}
                                        rules={[
                                            { required: true, message: "Selectionner la devise" },
                                        ]}
                                    >
                                        <Select size='large' placeholder="Séléctionner la devise" >
                                            {[...currencies].map((v, i) => {
                                                return (
                                                    <Option value={`${v['value']}`} >{v['label']}</Option>
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
                                        name="image"
                                        // initialValue={current && current['image']}
                                        label="Image du produit"
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => e && e.fileList}
                                        rules={[
                                            { required: true, message: "Selectionner l'image du produit" },
                                        ]}
                                    >
                                        <Upload
                                            className='w-100'
                                            style={{ width: "100%" }}
                                            multiple={false}
                                            maxCount={1}
                                            {...props}
                                        >
                                            <Button icon={<UploadOutlined />}>Selectionner l'image du produit</Button>
                                        </Upload>
                                        {/* <Input accept='.png,.jpg,.jpeg' type='file' size='large' placeholder="Selectionner l'image du produit" /> */}
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8}>
                                    <Form.Item
                                        className='w-100 pt-1'
                                        name="idmesure"
                                        label="Unité de mésure"
                                        initialValue={current && current['idmesure']}
                                        rules={[
                                            { required: true, message: "Séléctionner l'unité de mésure" },
                                        ]}
                                    >
                                        <Select showSearch size='large' placeholder="Séléctionner la Categorie" >
                                            {[...unities].map((v, i) => {
                                                return (
                                                    <Option value={`${v['id']}|${v['unity']}`} >{`${v['unity']}`}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={8} >
                                    <Form.Item
                                        label="  "
                                    >
                                        <Button
                                            style={{ width: "100%" }}
                                            type="primary"
                                            htmlType="submit"
                                            disabled={isloading}
                                        >
                                            <span>Enregistrer</span>
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    )
}