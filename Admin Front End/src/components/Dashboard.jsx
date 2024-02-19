
import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + window.localStorage.getItem('token'),
            }
        }).then((res) => {
            if (res.status == 200 || res.status == 300) {
                res.json().then((message) => {
                    setCourses(message.courses)
                })
            }
            else {
                navigate('/login');
            }
        })
    }, [])

    return <div>

        <div style={{
            'width': '70%',
            'margin': 'auto',
            'display': 'flex',
            'flexDirection': 'column',
            'gap': '15px',

        }}>
            <Typography variant='h5'>All Courses</Typography>
            <div style={{
                'display': 'grid',
                'gridTemplateColumns': 'repeat(3, 1fr)',
                'gap': '15px',
                'gridAutoRows': 'minmax(100px, auto)'
            }}>
                {courses.length > 0 && (courses.map(c => <CourseCard key={c._id} course={c} />))}

            </div>
        </div>
    </div>
}

export default Dashboard;