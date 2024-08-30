import Layout from "../components/Layout";
import GroupContainer from "../components/GroupContainer";
import EventCard from "../components/EventCard";
import { Grid } from "@mui/material";

import { useParams } from "react-router-dom";

const GroupDetail = () => {
  const {id} = useParams()

  return (
    <Layout>
        <GroupContainer item={id}/>
        {/* <TaskTable item={id}/> */}
        <Grid container direction="row" justifyContent="center">
   <Grid item xs={12}>
        <EventCard item={id}/>
      </Grid>
      </Grid>
  </Layout>
  )
}

export default GroupDetail