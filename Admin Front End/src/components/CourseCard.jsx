import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CourseCard = (props) => {

    const defaultImage = 'https://st2.depositphotos.com/1350793/8441/i/950/depositphotos_84416316-stock-photo-hand-pointing-to-online-course.jpg'
    return <Card sx={{ maxWidth: 345 }} >
        <CardContent style={{
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center'
        }}>
            <Typography variant={'h6'}>{props.course.title}</Typography>
            <img src={defaultImage} width={'200'} height={'200'}></img>
            <Typography variant={'subtitle1'}>Price : ${props.course.price}</Typography>
            <div style={{
                'width': '100%',
                'display': 'flex',
                'justifyContent': 'space-between',

            }}>
                <Typography variant={'subtitle2'}>Description</Typography>
                <Typography variant={'subtitle2'} color={props.course.published ? 'green' : 'red'}>{props.course.published ? "Published" : "Not Published"}</Typography>
            </div>
            <Typography variant={'subtitle2'}>{props.course.description}</Typography>
        </CardContent>
    </Card>
}

export default CourseCard;