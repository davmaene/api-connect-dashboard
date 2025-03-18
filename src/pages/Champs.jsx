import * as React from 'react';
import { Card, Col, Radio, Row, Typography, Table, Space, Tag, message, Button, Modal } from 'antd';
import Paragraph from "antd/lib/typography/Paragraph";
import { Colors } from '../assets/colors/colors';
import { limitCharacters, now } from '../helpers/helper.all';
import { appname, baseURL } from '../appconstants/app.constants';
import { LuPlus, LuRefreshCw } from "react-icons/lu"
import { onDeleteItem, onLoadAllChamps, onLoadAllCooperatives, onLoadAllUsers } from '../helpers/helper.call';
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { AddUserInterface } from '../interfaces/Utilisateurs/Add.int';
import { EditUserInterface } from '../interfaces/Utilisateurs/Edit.int';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { ShowupfarminfosInterface } from '../interfaces/Farms/Farms';

const { Title, Text } = Typography;
const { Column, ColumnGroup } = Table;

export const ChampsScreen = () => {

    const [add, setadd] = React.useState(false);
    const [edit, setedit] = React.useState(false);
    const [eye, seteye] = React.useState(false);
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
            title: 'Champs',
            dataIndex: 'farm',
            key: 'farm',
        },
        {
            title: 'Propriétaire',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Numéro de contact',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Coordonnées',
            dataIndex: 'latlong',
            key: 'latlong',
        },
        {
            title: 'Dimensions ( Ha )',
            dataIndex: 'dimensions',
            key: 'dimensions',
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'Territoire',
            dataIndex: 'territoire',
            key: 'territoire',
        },
        {
            title: 'Village',
            dataIndex: 'village',
            key: 'village',
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
                            seteye(true)
                            setcurrent(e)
                        }}>
                            <IoMdEye />
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
        onLoadAllChamps({
            options: {
                limit,
                offset
            },
            callback: (err, done) => {
                setisloading(false)
                if (done) {
                    done = Array.from(done).map(d => {
                        const { __tbl_projects = [], __tbl_user, id, __tbl_province, __tbl_territory, __tbl_village = {}, dimensions } = d
                        const { nom, postnom, prenom, email, phone } = __tbl_user;
                        const { province } = __tbl_province;
                        const { territoire } = __tbl_territory;
                        const { village = "---" } = __tbl_village || {};

                        return {
                            key: id,
                            ...d,
                            owner: `${nom} ${postnom}`,
                            phone,
                            village: village || "---",
                            territoire: territoire || "---",
                            province: province || "---",
                            dimensions: String(dimensions).concat(" Hectare (s)")
                        }
                    })
                    setlist(done);
                    settemp(done)
                } else {
                    setlist([])
                    settemp([])
                    console.log(err, done);
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
                                <Title level={5}>Liste de champs agricoles ( {list.length} )</Title>
                                <Paragraph className="lastweek">
                                    Liste des champs agricoles | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
                            </div>
                            <div className="">

                            </div>
                            <div className="ant-filtertabs">
                                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        {/* <Radio.Button value="a" type='primary' style={{ background: Colors.primaryColor, color: Colors.whiteColor }} onClick={() => setadd(true)} >
                                            <LuPlus style={{ marginRight: 10, color: Colors.whiteColor }} />
                                            Ajouter une coopérative
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
                            </Table>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Modal
                open={eye}
                title={null}
                width={1000}
                footer={null}
                destroyOnClose
                centered
                onCancel={() => {
                    seteye(false)
                }}
            >
                <ShowupfarminfosInterface
                    current={current}
                    cb={(e) => {
                        if (e === true) {
                            __load()
                            setedit(false)
                        }
                    }}
                    key={902002920}
                />
            </Modal>
        </>
    )
}