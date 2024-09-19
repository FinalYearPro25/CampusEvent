import Layout from "../components/Layout";
import GroupContainer from "../components/GroupContainer";
import EventCard from "../components/EventCard";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetEventList } from "../hooks/useGetEventList";

const GroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEventList(id);

  return (
    <Layout>
      <GroupContainer item={id} />
      <Grid container spacing={2}>
        {data &&
          data.map((item: any) => (
            <Grid item xs={12} md={6} lg={6}  mb={2}>
              <EventCard item={item} />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
};

export default GroupDetail;
