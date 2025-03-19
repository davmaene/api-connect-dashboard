import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { formmatDate, groupArrayElementByColumn, now, unixToDate } from "../../helpers/helper.all";
import { Colors } from "../../assets/colors/colors";

function LineChart({ data }) {

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

  const dates = dataNordKivu.map(item => item.date);
  const tempMin = dataNordKivu.map(item => item.tempMin);
  const tempMax = dataNordKivu.map(item => item.tempMax);
  const humidite = dataNordKivu.map(item => item.humidite);

  const chartOptionsTemp = {
    chart: {
      id: 'temp-chart',
      type: 'line',
      zoom: { enabled: false }
    },
    xaxis: {
      categories: dates,
      title: {
        text: 'Dates'
      }
    },
    yaxis: {
      title: {
        text: 'Température (°C)'
      }
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#FF5733', '#33FF57']
  };

  const chartOptionsHumidity = {
    chart: {
      id: 'humidity-chart',
      type: 'line',
      zoom: { enabled: false }
    },
    xaxis: {
      categories: dates,
      title: {
        text: 'Dates'
      }
    },
    yaxis: {
      title: {
        text: 'Humidité (%)'
      }
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#3399FF']
  };

  return (
    <>
      <div className="linechart">
        {/* <div>
          <Title level={5}>Activités des visites</Title>
          <Paragraph className="lastweek">
            Evolutions journalières <span className="bnb2" style={{ color: Colors.primaryColor }}>| mis à jour {now()}</span>
          </Paragraph>
        </div> */}
      </div>
      <div className="px-3">
        <ReactApexChart
          className="full-width"
          width={"100%"}
          options={chartOptionsTemp}
          series={[
            { name: 'Temp. Minimale', data: tempMin },
            { name: 'Temp. Maximale', data: tempMax }
          ]}
          type="line"
          height={350}
        />
      </div>
    </>
  );
}

export default LineChart;
