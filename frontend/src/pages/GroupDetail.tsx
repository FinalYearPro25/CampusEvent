import Layout from "../components/Layout";
import GroupContainer from "../components/GroupContainer";
import EventCard from "../components/EventCard";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetEventList } from "../hooks/useGetEventList";

const GroupDetail = () => {
  const {id} = useParams()

  const {data, isPending} = useGetEventList(id);
  return (
    <Layout>
        <GroupContainer item={id}/>
        {/* <TaskTable item={id}/> */}
        <Grid container direction="row" justifyContent="center">
    {data.data.map((item:any) =>(
   <Grid item xs={12}>

     <EventCard item={item}/>
   </Grid>
    ))}

      </Grid>
  </Layout>
  )
}

export default GroupDetail

