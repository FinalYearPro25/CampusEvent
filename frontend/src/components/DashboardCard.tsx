import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import GroupIcon from '@mui/icons-material/Group';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { Link } from 'react-router-dom';

const renderIcon = (keyword) =>{
    switch (keyword) {
        case "members":
            return ( <div ><GroupIcon style={{ marginRight: '8px', verticalAlign: 'middle' , fontSize: "40px" }} /> <span style={{ fontWeight: "bold"}}>Total Requests</span> </div>) ;
        case "events":
            return ( <div ><DateRangeIcon style={{ marginRight: '8px', verticalAlign: 'middle'  , fontSize: "40px"  }} /> <span style={{ fontWeight: "bold"}} >My Events</span> </div>) ;
        case "groups":
            return ( <div ><DynamicFeedIcon style={{ marginRight: '8px', verticalAlign: 'middle'  , fontSize: "40px" }} /> <span style={{ fontWeight: "bold"}}>Total Attending</span> </div>) ;
          case "groups":
            return ( <div ><DynamicFeedIcon style={{ marginRight: '8px', verticalAlign: 'middle'  , fontSize: "40px" }} /> <span style={{ fontWeight: "bold"}}>Total Attending</span> </div>) ;
    }
}

export default function DashboardCard({ item, keyword }) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align='center'>
            {renderIcon(keyword)}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align='center'>
          {item}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
