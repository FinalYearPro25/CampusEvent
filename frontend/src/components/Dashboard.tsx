import { Grid } from "@mui/material";
import { useGetStatistics } from "../hooks/useGetStatistics";
import DashboardCard from "./DashboardCard";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import EventTable from "../components/EventTable";
import { useGetUserEventsMonthly } from "../hooks/useGetUserEventsMonthly";

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let monthname = month[d.getMonth()];

const DashboardContent = () => {
  const { data:stat, isLoading } = useGetStatistics();
  const { data: user, isLoading: isuserloading } = useIsLoggedIn();
  const {data , isLoading: isEventLoading} = useGetUserEventsMonthly(user?.user_id);


  if (isLoading || isuserloading || isEventLoading) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {Object.keys(stat).map((key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <DashboardCard item={stat[key]} keyword={key} />
          </Grid>
        ))}
      </Grid>
      <h2 style={{ marginTop: '25px', marginBottom: '10px'}}>Events for {monthname}</h2>
      <EventTable events={{data}} />

    </>
  );
};
export default DashboardContent;
