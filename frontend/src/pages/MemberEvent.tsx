import Layout from "../components/Layout";
import { Grid } from "@mui/material";
import MyCalendar from '../components/EventCalander';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../assets/css/calander.css';


const MemberEvents = () => {


  return (
    <Layout>
        <h2 style={{ marginLeft: '-15px'}}>All Events</h2>
      <Grid  mt={4} >
    <MyCalendar/>
      </Grid>
    </Layout>
  );
};

export default MemberEvents;