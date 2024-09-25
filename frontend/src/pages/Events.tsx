import Layout from "../components/Layout";
import { Grid } from "@mui/material";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import EventTable from "../components/EventTable";
import { useGetUserEvents } from "../hooks/useGetUserEvents";


const Events = () => {
  const { data: user, isLoading: isuserloading } = useIsLoggedIn();
  const {data , isLoading} = useGetUserEvents(user?.user_id);
//   console.log(data);
  if(isuserloading || isLoading){
    return <div>Loading..</div>
  }


  return (
    <Layout>
        <h2 style={{ marginLeft: '-15px'}}>All Events</h2>
      <Grid container mt={4} spacing={2}>
        <EventTable events={{data}} />

      </Grid>
    </Layout>
  );
};

export default Events;