import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
// import eChart from "./configs/eChart";
import { groupArrayElementByColumn, now, unixToDate } from "../../helpers/helper.all";
import { Colors } from "../../assets/colors/colors";

function EChart({ data }) {
  const { Title, Paragraph } = Typography;
  const { users, stores, projects, labos, visites } = data;

  const groupeusers = groupArrayElementByColumn({
    arr: users,
    columnName: 'createdonunix'
  })

  const eChart = {
    series: [
      {
        name: "Utilisateurs",
        data: [...Object.keys(groupeusers).map(u => groupeusers[u]['length'])],
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [...Object.keys(groupeusers).map(g => unixToDate({ unix: g }))],
        labels: {
          show: true,
          align: "top",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val + " Utilisateur(s)";
          },
        },
      },
    },
  }

  const items = [
    {
      Title: users.length || 0,
      user: "Utilisateurs",
    },
    {
      Title: visites.length || 0,
      user: "Visites",
    },
    {
      Title: stores.length || 0,
      user: "Marchands",
    },
    {
      Title: projects.length || 0,
      user: "Projets encours",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Recentes activités</Title>
        <Paragraph className="lastweek">
          Dernières mis à jour <span className="bnb2" style={{ color: Colors.primaryColor }}>{now()}</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Evolution des activités journalières liées sur toutes les catégories des Utilisateurs.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
