import Layout from "../components/Layout";
import GroupContainer from "../components/GroupContainer";
import EventCard from "../components/EventCard";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetEventList } from "../hooks/useGetEventList";

const GroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEventList(id);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Layout>
      <GroupContainer item={id} />
      <Grid container direction="row" justifyContent="center">
        {data &&
          data.map((item: any) => (
            <Grid item xs={12} mb={2}>
              <EventCard item={item} />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
};

export default GroupDetail;
