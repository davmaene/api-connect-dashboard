import * as React from 'react';
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Modal,
    Upload,
    Divider,
    message,
    Progress,
    Button,
    Input,
    Avatar,
    Select,
    Checkbox,
    Form,
    TimePicker,
    Tabs,
    Typography,
    Tag,
    Badge,
} from "antd";
import { AimOutlined, EllipsisOutlined, FileAddFilled, StopOutlined, ToTopOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { GrMultiple } from 'react-icons/gr';
import { toast } from 'react-hot-toast';
import { FiEdit, FiEye, FiRefreshCw, FiStopCircle, FiTrash2 } from 'react-icons/fi';
import tableExport from "antd-table-export";
import { routes } from '../helpers/helper.routes';
import { Colors } from '../assets/colors/colors';
import { handleSearch } from 'dm-handlesearch';
import { retrieveSession } from '../helpers/helper.session';
import { now, onFinishFailed } from '../helpers/helper.all';
import { LuRefreshCw } from 'react-icons/lu';
import { appname } from '../appconstants/app.constants';
import { onLoadAllProvinces, onLoadAllTerritoriesByProvinces, onLoadAllVillages, onLoadAllVillagesByTerritoirePaginated } from '../helpers/helper.call';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const VillagesPage = () => {

    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    const [jobs, setjobs] = React.useState([]);
    const [temps, settemps] = React.useState([]);
    const [isloading, setisloading] = React.useState(false);
    const [keyword, setkeyword] = React.useState("");
    const history = useHistory();
    const [user, setUser] = React.useState({});
    const [offset, setoffset] = React.useState(1);
    const [limit, setlimit] = React.useState(50);
    const [_size, _setsiize] = React.useState(0);

    const [territoires, setterritoires] = React.useState([]);
    const [provinces, setprovinces] = React.useState([]);

    const headers = {
        _labels: ["#", "Nom du village", "Latitude", "Longitude", "Province", "Territoire", "Code village"],
        _keys: ["id", "village", "latitude", "longitude", "province", "territoire", "longcode"]
    };

    const columns = [
        {
            title: "Nom du village",
            dataIndex: "village",
            key: "village",
        },
        {
            title: "Latitude",
            dataIndex: "latitude",
            key: "latitude",
            render: (name) => {
                return <strong>{name}</strong>
            }
        },
        {
            title: "Longitude",
            key: "longitude",
            dataIndex: "longitude",
            render: (name) => {
                return <strong>{name}</strong>
            }
        },
        {
            title: "Vérifier ?",
            key: "isvalidated",
            dataIndex: "isvalidated",
            render: (name) => name === 0 ? <strong style={{ color: Colors.dangerColor }}>Non vérifié</strong> : <strong style={{ color: Colors.successColor }}>Vérifié</strong>
        },
        {
            title: "Territoire",
            key: "territoire_name",
            dataIndex: "territoire_name",
            render: (name) => {
                return <strong>{name}</strong>
            }
        },
        {
            title: "Province",
            key: "province_name",
            dataIndex: "province_name",
            render: (name) => {
                return <strong>{name}</strong>
            }
        },
        {
            title: "Code province",
            key: "provincecode",
            dataIndex: "provincecode",
            render: (name) => {
                return <strong>{name}</strong>
            }
        }
    ];

    const exportInstance = new tableExport(jobs, columns);

    const _____onLoadInfos = async () => {
        setisloading(true);
        onLoadAllVillages({
            options: {},
            callBack: (err, done) => {
                setisloading(false)
                if (done) {
                    const { size, length, liste } = done;
                    const d = Array.from(liste).map(l => {
                        const { __tbl_territory } = l;
                        const { territoire, __tbl_province } = __tbl_territory
                        const { province = "---" } = __tbl_province || {}
                        return {
                            ...l,
                            territoire_name: territoire,
                            province_name: province
                        }
                    })
                    settemps(d);
                    setjobs(d);
                    _setsiize(size)
                } else {
                    settemps([]);
                    setjobs([])
                }
            }
        })

        onLoadAllProvinces({
            options: {},
            callBack: (err, done) => {
                setisloading(false)
                if (done) {
                    setprovinces(done)
                } else {
                    setprovinces([])
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
    }

    const __onLoadVillages = async ({ index }) => {
        index = index.substring(0, index.indexOf("|"));
        handleSearch({
            columns: ['territoire'],
            keyword: index,
            rows: temps,
            cb: ({ rows, keyword, length }) => {
                setisloading(false)
                setjobs(rows)
            }
        })
    }

    const ___handleSearch = ({ keyword }) => {
        setisloading(true)
        handleSearch({
            columns: ['village'],
            keyword,
            rows: temps,
            cb: ({ rows, keyword, length }) => {
                setisloading(false)
                setjobs(rows)
            }
        })
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
        _____onLoadInfos({ limit, offset })
    }, [])

    return (
        <>

            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="project-ant">
                            <div>
                                <Title level={5}>Liste des villages ( {jobs.length} )</Title>
                                <Paragraph className="lastweek">
                                    Liste des villages {appname} | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
                            </div>
                            <div className="">

                            </div>
                            <div className="ant-filtertabs">
                                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        <Radio.Button
                                            style={{ background: Colors.whiteColor }}
                                            value="all"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                message.info("Non pris en charge pour le moment !")
                                                // history.push({
                                                //   pathname: routes['importall'],
                                                //   state: {
                                                //     from: importFromRoutes['cooperative']
                                                //   }
                                                // })
                                            }}
                                        >
                                            <GrMultiple color={Colors.primaryColor} size={12} style={{ marginRight: 10 }} />
                                            <span style={{ color: Colors.primaryColor }}>Importer depuis un fichier XLSX</span>
                                        </Radio.Button>
                                        <Radio.Button
                                            disabled={isloading}
                                            style={{ border: 0 }}
                                            onClick={(e) => {
                                                exportInstance.download('_table_as_villages', "xlsx");
                                            }}
                                        >
                                            <FileExcelOutlined style={{ color: Colors.primaryColor }} color={Colors.primaryColor} />
                                            <span style={{ color: Colors.primaryColor }}>Exporter sous format XSLX les séléctions</span>
                                        </Radio.Button>
                                        <Radio.Button value="b" onClick={() => _____onLoadInfos()}>
                                            <LuRefreshCw style={{ marginRight: 10 }} />
                                            Actualiser la liste
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className="ant-list-box table-responsive">
                            <div className="w-100 px-3">
                                <Form
                                    // form={form}
                                    title={"Filtre"}
                                    layout='vertical'
                                    name="basic"
                                    onFinish={(v) => { }}
                                    onFinishFailed={onFinishFailed}
                                    className="row-col col-lg-12 pt-3"
                                >
                                    <Row gutter={[24, 0]}>
                                        <Col span={12} md={8} >
                                            <Form.Item
                                                className='w-100'
                                                name="province"
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
                                                className='w-100'
                                                name="territoire"
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
                                        <Col span={12} md={8}>
                                            <Form.Item
                                                className='w-100'
                                                name="village"
                                                label="Recherche nom du village"
                                                rules={[
                                                    { required: false, message: "Rechercehe nom du village" },
                                                ]}
                                            >
                                                <Input
                                                    style={{
                                                        width: '100%',
                                                        float: "right",
                                                        position: "relative",
                                                    }}
                                                    placeholder="mot de recherche ..."
                                                    onChange={(e) => {
                                                        setkeyword(e.target.value)
                                                        ___handleSearch({ keyword: e.target.value })
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <Table
                                loading={isloading}
                                columns={columns}
                                dataSource={jobs}
                                className='px-4'
                                pagination={{
                                    position: ["bottomCenter"],
                                    // defaultPageSize: limit,
                                    // pageSize: _size,
                                    total: _size,
                                    onChange: (offset, limit) => {
                                        _____onLoadInfos({ limit, offset });
                                        // console.log(limit, offset);
                                        setlimit(limit)
                                        setoffset(offset)
                                    }
                                }}
                                bordered
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
