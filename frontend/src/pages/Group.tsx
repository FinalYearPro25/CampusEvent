import Layout from "../components/Layout";
import { Fab, Grid } from "@mui/material";
import GroupCard from "../components/GroupCard";
import { useGetGroups } from "../hooks/getGroups";
import Cookies from 'js-cookie';
import { useIsLoggedIn } from "../hooks/getIsLoggedIn";

const Groups = () => {
  const { data: user, isLoading: isuserloading } = useIsLoggedIn();


  const { data, isLoading } = useGetGroups(user?.user_id);

  if(isuserloading || isLoading){
    return <div>Loading</div>
  }


  return (
    <Layout>
      <Grid container spacing={2}>
        {data.data.map((item:any) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <GroupCard item={item} />
          </Grid>
        ))}

      </Grid>
    </Layout>
  );
};

export default Groups;