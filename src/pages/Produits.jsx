import * as React from 'react';
import { Card, Col, Radio, Row, Typography, Table, Space, Tag, message, Button, Modal } from 'antd';
import Paragraph from "antd/lib/typography/Paragraph";
import { Colors } from '../assets/colors/colors';
import { limitCharacters, now } from '../helpers/helper.all';
import { appname, baseURL } from '../appconstants/app.constants';
import { LuPlus, LuRefreshCw } from "react-icons/lu"
import { onDeleteItem, onLoadAllLabos, onLoadAllProducts, onLoadAllUsers } from '../helpers/helper.call';
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { AddLaboInterface } from '../interfaces/Laboratoires/Add.int';
import { EditLaboInterface } from '../interfaces/Laboratoires/Edit.int';
import { AddProductsInterface } from '../interfaces/Produits/Add.int';
import { EditProductsInterface } from '../interfaces/Produits/Edit.int';

const { Title, Text } = Typography;
const { Column, ColumnGroup } = Table;

export const ProduitsScreen = () => {

    const [add, setadd] = React.useState(false);
    const [edit, setedit] = React.useState(false);
    const [del, setdel] = React.useState(false);
    const [view, setview] = React.useState(false);
    const [isloading, setisloading] = React.useState(false);
    const [list, setlist] = React.useState([])
    const [temp, settemp] = React.useState([])
    const [limit, setlimit] = React.useState(1000);
    const [offset, setoffset] = React.useState(0);
    const [selectedrows, setSelectedrows] = React.useState([]);
    const [current, setcurrent] = React.useState(null)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedrows(selectedRows)
            // console.log("On change",`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            setSelectedrows(selectedRows)
            // console.log("On select ===> ", record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            setSelectedrows(selectedRows)
            // console.log("On Select All ===> ", selected, selectedRows, changeRows);
        },
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Produit',
            dataIndex: 'produit',
            key: 'produit',
        },
        {
            title: 'Prix minimum',
            dataIndex: 'price_min',
            key: 'price_min',
        },
        {
            title: 'Prix max',
            dataIndex: 'price_max',
            key: 'price_max',
        },
        {
            title: 'Devise',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Catégorie',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Unité de mésure',
            dataIndex: 'unity',
            key: 'unity',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Création',
            dataIndex: 'createdon',
            key: 'createdon',
        },
        {
            title: 'Actions',
            key: 'description',
            render: (e) => {
                return (
                    <Button.Group size='middle'>
                        <Button onClick={() => {
                            setedit(true)
                            setcurrent(e)
                        }}>
                            <MdModeEdit />
                        </Button>
                        <Button onClick={() => {
                            setdel(true)
                            setcurrent(e)
                        }}>
                            <MdDelete color={Colors.dangerColor} />
                        </Button>
                    </Button.Group>
                )
            }
        },
    ]

    const onDelete = async () => {
        setisloading(true)
        const { id } = current
        onDeleteItem({
            options: {
                item: id,
                url: `/produits/produit`
            },
            callback: (er, done) => {
                setisloading(false);
                if (done) {
                    message.success("Opération effectuer avec succès !")
                    setdel(false)
                    __load()
                } else {
                    message.error("impossible de supprimer un élément !, réessayer un peu plus tard")
                }
            }
        })
    };

    const __load = async () => {
        setisloading(true)
        onLoadAllProducts({
            options: {
                limit,
                offset
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    done = Array.from(done).map(d => {

                        const { __tbl_unitymesure, __tbl_category, __tbl_user, id } = d

                        const { unity } = __tbl_unitymesure || {}
                        const { category } = __tbl_category || {}
                        const { nom, postnom, prenom, phone, email } = __tbl_user || {}

                        return {
                            key: id,
                            ...d,
                            unity: unity || "---",
                            category: category || "---",
                        }
                    })
                    setlist(done);
                    settemp(done)
                } else {
                    setlist([])
                    settemp([])
                    message.error("Erreur de chargement, réessayer un peu plus tard !")
                }
            }
        })
    };

    const onChange = async () => { };

    React.useEffect(() => {
        __load()
    }, []);

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="project-ant">
                            <div>
                                <Title level={5}>Liste des produits ( {list.length} )</Title>
                                <Paragraph className="lastweek">
                                    Liste des produits {appname} | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
                            </div>
                            <div className="">

                            </div>
                            <div className="ant-filtertabs">
                                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        <Radio.Button value="a" type='primary' style={{ background: Colors.primaryColor, color: Colors.whiteColor }} onClick={() => setadd(true)} >
                                            <LuPlus style={{ marginRight: 10, color: Colors.whiteColor }} />
                                            Ajouter un produit
                                        </Radio.Button>
                                        <Radio.Button value="b" onClick={() => __load()}>
                                            <LuRefreshCw style={{ marginRight: 10 }} />
                                            Actualiser la liste
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className="ant-list-box table-responsive">
                            <Table
                                bordered
                                className='px-4'
                                tailor
                                size='large'
                                columns={columns}
                                dataSource={list}
                                pagination={{
                                    position: ['bottomCenter']
                                }}
                                rowSelection={{
                                    ...rowSelection
                                }}
                                loading={isloading}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal
                open={del}
                title="Suppression"
                destroyOnClose
                centered
                onCancel={() => {
                    setdel(false)
                }}
                onOk={() => {
                    // setdel(false)
                    onDelete()
                    // __load()
                }}
                confirmLoading={isloading}
                okText="Continuer Quand même"
                cancelText="Annuler"
            >
                <span>Vous ête sur le point de supprimer un élément. Voulez-vous vraiement continuer ?</span>
            </Modal>

            <Modal
                open={add}
                title={null}
                width={1000}
                footer={null}
                destroyOnClose
                centered
                onCancel={() => {
                    setadd(false)
                }}
            >
                <AddProductsInterface
                    cb={(e) => {
                        if (e === true) {
                            __load()
                            setadd(false)
                        }
                    }}
                    key={9020020}
                />
            </Modal>

            <Modal
                open={edit}
                title={null}
                width={1000}
                footer={null}
                destroyOnClose
                centered
                onCancel={() => {
                    setedit(false)
                }}
            >
                <EditProductsInterface
                    current={current}
                    cb={(e) => {
                        if (e === true) {
                            __load()
                            setedit(false)
                        }
                    }}
                    key={9020020}
                />
            </Modal>
        </>
    )
}