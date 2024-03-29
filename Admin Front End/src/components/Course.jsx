import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EditCourse from "../modals/EditCourse";
import { useState } from "react";

const Course = () => {
    const defaultImage = 'https://st2.depositphotos.com/1350793/8441/i/950/depositphotos_84416316-stock-photo-hand-pointing-to-online-course.jpg'
    const location = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState(location.state);

    const [openModal, setOpenModal] = useState(false);

    const onDeleteHandler = () => {

    }

    const onEditHandler = () => {
        window.localStorage.getItem('token') && fetch("http://localhost:3000/admin/loggedIn", {
            method: 'GET',
            headers: {
                'authorization': 'bearer ' + window.localStorage.getItem('token'),
            }
        }).then(res => {
            if (res.status == 200) setOpenModal(true)
            else navigate('/login')
        })

    }

    return (course && (<div style={{
        'width': '70%',
        'display': 'flex',
        'margin': '40px auto',
    }}>
        <Card sx={{
            minWidth: '100%',
        }}>
            <CardContent >
                <div style={{
                    'display': 'flex',
                    'justifyContent': 'space-between',
                    'margin': '30px'
                }}>
                    <div style={{
                        'display': 'flex',
                        'flexDirection': 'column',
                        'gap': '20px'
                    }}>
                        <Typography variant="h3">{course.title}</Typography>
                        <Typography variant='h5'>Price : ${course.price}</Typography>
                        <Typography variant='h5'>Published : {course.published ? "Yes" : "No"}</Typography>
                        <Typography variant="body1">{course.description}</Typography>
                    </div>
                    <div>
                        <img src={defaultImage} width={'350'} height={'350'}></img> {/* Link to be changed */}
                    </div>
                </div>
                <div style={{
                    'display': 'flex',
                    'justifyContent': 'center',
                    'gap': '20px'
                }}>
                    <Button variant={'contained'} size={'small'} color="error" onClick={onDeleteHandler}>Delete</Button>
                    <Button variant={'contained'} size={'small'} onClick={onEditHandler}>Edit</Button>
                    {openModal && (<EditCourse open={openModal} setOpen={setOpenModal} course={course} setCourse={setCourse} />)}
                </div>

            </CardContent>
        </Card>
    </div>)) || (navigate('/login'))
}

export default Course;