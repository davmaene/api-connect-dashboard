import * as React from 'react';
import { Card, Col, Radio, Row, Typography, Table, Space, Tag, message, Button, Modal } from 'antd';
import Paragraph from "antd/lib/typography/Paragraph";
import { Colors } from '../assets/colors/colors';
import { limitCharacters, now } from '../helpers/helper.all';
import { appname, baseURL } from '../appconstants/app.constants';
import { LuPlus, LuRefreshCw } from "react-icons/lu"
import { onDeleteItem, onLoadAllCooperatives, onLoadAllUsers } from '../helpers/helper.call';
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { AddUserInterface } from '../interfaces/Utilisateurs/Add.int';
import { EditUserInterface } from '../interfaces/Utilisateurs/Edit.int';
import { MdDelete, MdModeEdit } from 'react-icons/md';

const { Title, Text } = Typography;
const { Column, ColumnGroup } = Table;

export const CooperativesScreen = () => {

    const [add, setadd] = React.useState(false);
    const [edit, setedit] = React.useState(false);
    const [del, setdel] = React.useState(false);
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
            title: 'Cooperative',
            dataIndex: 'cooperative',
            key: 'cooperative',
        },
        {
            title: 'Nombre de projets',
            dataIndex: 'nbprojets',
            key: 'nbprojets',
        },
        {
            title: 'Nombre de membres',
            dataIndex: 'nbmembers',
            key: 'nbmembers',
        },
        // {
        //     title: 'Adresse',
        //     dataIndex: 'adresse',
        //     key: 'adresse',
        // },
        // {
        //     title: 'Province',
        //     dataIndex: 'province',
        //     key: 'province',
        // },
        // {
        //     title: 'Territoire',
        //     dataIndex: 'territoire',
        //     key: 'territoire',
        // },
        // {
        //     title: 'Responsable',
        //     dataIndex: 'responsable',
        //     key: 'responsable',
        // },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        // },
        // {
        //     title: 'Phone',
        //     dataIndex: 'phone',
        //     key: 'phone',
        // },
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
        // {
        //     title: 'Actions',
        //     key: 'description',
        //     render: (e) => {
        //         return (
        //             <Button.Group size='middle'>
        //                 <Button onClick={() => {
        //                     setedit(true)
        //                     setcurrent(e)
        //                 }}>
        //                     <MdModeEdit />
        //                 </Button>
        //                 <Button onClick={() => {
        //                     setdel(true)
        //                     setcurrent(e)
        //                 }}>
        //                     <MdDelete color={Colors.dangerColor} />
        //                 </Button>
        //             </Button.Group>
        //         )
        //     }
        // },
    ]

    const onDelete = async () => {
        setisloading(true)
        const { id } = current
        onDeleteItem({
            options: {
                item: id,
                url: `/users/user`
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
    }

    const __load = async () => {
        setisloading(true)
        onLoadAllCooperatives({
            options: {
                limit,
                offset
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    done = Array.from(done).map(d => {
                        const { __tbl_projects = [], __tbl_users = [], id } = d
                        return {
                            key: id,
                            ...d,
                            nbprojets: __tbl_projects.length,
                            nbmembers: __tbl_users.length
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
    }

    const onChange = async () => { }

    React.useEffect(() => {
        __load()
    }, [])

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="project-ant">
                            <div>
                                <Title level={5}>Liste des coopératives agricoles ( {list.length} )</Title>
                                <Paragraph className="lastweek">
                                    Liste des coopératives agricoles | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
                            </div>
                            <div className="">

                            </div>
                            <div className="ant-filtertabs">
                                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        <Radio.Button value="a" type='primary' style={{ background: Colors.primaryColor, color: Colors.whiteColor }} onClick={() => setadd(true)} >
                                            <LuPlus style={{ marginRight: 10, color: Colors.whiteColor }} />
                                            Ajouter une coopérative
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
                            >
                                {/* <ColumnGroup title="Identités">
                                    <Column title="Nom" dataIndex="nom" key="nom" />
                                    <Column title="Postnom" dataIndex="postnom" key="postnom" />
                                    <Column title="Prenom" dataIndex="prenom" key="prenom" />
                                </ColumnGroup>
                                <ColumnGroup title="Contacts">
                                    <Column title="Téléphone" dataIndex="phone" key="phone" />
                                    <Column title="Eamil" dataIndex="email" key="email" />
                                </ColumnGroup>
                                <Column title="Genre" dataIndex="genre" key="genre" />
                                <Column title="Address" dataIndex="adresse" key="adresse" />
                                <ColumnGroup title="Origin">
                                    <Column title="Province" dataIndex="province" key="idprovince" />
                                    <Column title="Territoire" dataIndex="territoire" key="idterritoire" />
                                    <Column title="Village" dataIndex="village" key="idvillage" />
                                </ColumnGroup>
                                <Column
                                    title="Actions"
                                    key="action"
                                    render={(_, record) => (
                                        <Button.Group size='middle'>
                                            <Button onClick={() => { setedit(true); setcurrent(record) }}><AiFillEdit color={Colors.primaryColor} /></Button>
                                            <Button onClick={() => { setdel(true); setcurrent(record) }}><AiFillDelete color={Colors.dangerColor} /></Button>
                                            <Button onClick={() => { setview(true); setcurrent(record) }}><AiFillEye color={Colors.primaryColor} /></Button>
                                        </Button.Group>
                                    )}
                                /> */}
                            </Table>
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
                <AddUserInterface
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
                <EditUserInterface
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