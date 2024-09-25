import { Grid } from "@mui/material";
import { useGetStatistics } from "../hooks/useGetStatistics";
import DashboardCard from "./DashboardCard";
const DashboardContent = () => {
  const { data, isLoading } = useGetStatistics();
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {Object.keys(data).map((key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <DashboardCard item={data[key]} keyword={key} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default DashboardContent;
