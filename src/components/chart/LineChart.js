import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { formmatDate, groupArrayElementByColumn, now, unixToDate } from "../../helpers/helper.all";
import { Colors } from "../../assets/colors/colors";

function LineChart({ data }) {

  const { visits, users } = data;
  const { Title, Paragraph } = Typography;

  const v = groupArrayElementByColumn({
    arr: visits,
    columnName: `createdonunix`
  })

  const lineChart = {
    series: [
      // {
      //   name: "Utilisateurs",
      //   data: [...Object.keys(v).map(_v => v[_v].length)],
      //   offsetY: 0,
      // },
      {
        name: "Visites",
        data: [...Object.keys(v).map(_v => v[_v].length)],
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: [...Object.keys(v).map(_v => unixToDate({ unix: _v }))],
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Activités des visites</Title>
          <Paragraph className="lastweek">
            Evolutions journalières <span className="bnb2" style={{ color: Colors.primaryColor }}>| mis à jour {now()}</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            {/* <li>{<MinusOutlined />} Utilisateurs</li> */}
            <li>{<MinusOutlined />} Visites</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
