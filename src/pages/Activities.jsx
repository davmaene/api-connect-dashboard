import * as React from 'react';
import { appname } from '../appconstants/app.constants';
import { Colors } from '../assets/colors/colors';
import { Card, Col, Form, Input, Radio, Row, Select, Table, Typography } from 'antd';
import Paragraph from "antd/lib/typography/Paragraph";
import { LuRefreshCw } from 'react-icons/lu';
import { now, onFinishFailed } from '../helpers/helper.all';
import { onLoadAllProvinces, onLoadAllTerritoriesByProvinces, onLoadAllVillages } from '../helpers/helper.call';
import { handleSearch } from 'dm-handlesearch';
import LineChart from '../components/chart/LineChart';
import LineChartFirt from '../components/chart/LineChartmes';

const { Title, Text } = Typography;
const { Column, ColumnGroup } = Table;

export const ActivitiesScreen = () => {
    const [isloading, setisloading] = React.useState(false)
    const [list, setlist] = React.useState([])
    const [territoires, setterritoires] = React.useState([]);
    const [provinces, setprovinces] = React.useState([]);
    const [offset, setoffset] = React.useState(1);
    const [limit, setlimit] = React.useState(50);
    const [_size, _setsiize] = React.useState(0);
    const [jobs, setjobs] = React.useState([]);
    const [keyword, setkeyword] = React.useState("");
    const [temps, settemps] = React.useState([]);

    const dataNordKivu = [
        { date: "2024-02-15", tempMin: 18, tempMax: 25, village: "Kibirizi", humidite: 75 },
        { date: "2024-05-20", tempMin: 16, tempMax: 23, village: "Nyanzale", humidite: 80 },
        { date: "2024-08-10", tempMin: 19, tempMax: 26, village: "Rutshuru", humidite: 78 },
        { date: "2024-11-05", tempMin: 15, tempMax: 22, village: "Kanyabayonga", humidite: 72 },
        { date: "2025-01-12", tempMin: 20, tempMax: 28, village: "Masisi", humidite: 85 },
        { date: "2024-04-18", tempMin: 17, tempMax: 24, village: "Kiwanja", humidite: 79 },
        { date: "2024-09-30", tempMin: 21, tempMax: 29, village: "Oicha", humidite: 82 },
        { date: "2025-03-05", tempMin: 18, tempMax: 25, village: "Beni", humidite: 77 },
        { date: "2024-12-22", tempMin: 16, tempMax: 23, village: "Lubero", humidite: 74 },
        { date: "2025-02-28", tempMin: 19, tempMax: 27, village: "Kamango", humidite: 81 }
    ];

    const onChange = async () => {

    }

    const __load = async () => {

    }

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
    };

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
    };

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

    React.useEffect(() => {
        _____onLoadInfos()
    }, []);

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="project-ant">
                            <div>
                                <Title level={5}>Activité de prélevement ( {list.length} )</Title>
                                <Paragraph className="lastweek">
                                    Liste des activités {appname} | Dernière mis à jour <span className="blue" style={{ color: Colors.primaryColor }}>{now()}</span>
                                </Paragraph>
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
                                                            <Select.Option value={`${v && v['id']}|${v && v['province']}`} >{v && v['province']}</Select.Option>
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
                                                            <Select.Option value={`${v && v['id']}|${v && v['territoire']}`} >{v && v['territoire']}</Select.Option>
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
                            <div className="w-100 px-3">
                                <Row gutter={[24, 0]}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                                        <Card bordered={false} className="criclebox h-full">
                                            <LineChartFirt data={{ visits: dataNordKivu, users: [] }} />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                                        <Card bordered={false} className="criclebox h-full">
                                            <LineChart data={{ visits: dataNordKivu, users: [] }} />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}