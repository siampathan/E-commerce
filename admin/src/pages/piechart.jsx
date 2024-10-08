import { PieChart } from "@mui/x-charts/PieChart";

const PieChartDiagram = ({ delivered }) => {
  const colorPalette = ["#FF6384", "#36A2EB", "#FFCE56"];
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: delivered.Men, label: "Men" },
            { id: 1, value: delivered.Women, label: "Women" },
            { id: 2, value: delivered.Kids, label: "Kids" },
          ],
        },
      ]}
      width={400}
      height={200}
      colors={colorPalette}
    />
  );
};

export default PieChartDiagram;
