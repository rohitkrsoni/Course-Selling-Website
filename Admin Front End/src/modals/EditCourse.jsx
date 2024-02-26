import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import InputLabel from "../components/InputLabel";

const EditCourse = ({ open, setOpen, course, setCourse }) => {

    const [title, setTitle] = useState(course.title);
    const [price, setPrice] = useState(course.price);
    const [description, setDescription] = useState(course.description);
    const [imageLink, setImageLink] = useState(course.imageLink);
    const [published, setPublished] = useState(course.published); // To be implemented

    const handleOnClose = () => {
        setOpen(false)
    }

    const handleOnClickSave = async () => {
        var response = await fetch("http://localhost:3000/admin/courses/" + course._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + window.localStorage.getItem('token'),
            },
            body: JSON.stringify({
                'title': title,
                'price': price,
                'description': description,
                'imageLink': imageLink
            })

        })
        if (response.status == 200) {
            setCourse(prevCourse => ({ ...prevCourse, title: title, price: price, description: description, imageLink: imageLink }))
        }
        else {
            window.alert("An error occured");
            handleOnClose();
        }
        setOpen(false)
    }

    return <Modal onClose={handleOnClose} open={open}>
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <Typography variant="h5" component="h2">Edit Course</Typography>
                <InputLabel value={title} setValue={setTitle} label={"Title"} />
                <InputLabel value={price} setValue={setPrice} label={"Price"} />
                <InputLabel value={imageLink} setValue={setImageLink} label={"Image Link"} />
                {/* TO BE : Published to be implemented  <InputLabel value={published ? "Yes" : "No"} setValue={setPublished} label={"Published"} /> */}
                <InputLabel value={description} setValue={setDescription} label={"Description"} />
                {/* TO BE : Description input box to be multiline */}
                <div style={{
                    'display': 'flex',
                    'justifyContent': 'space-between',
                }}>
                    <Button variant="contained" color="error" onClick={handleOnClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handleOnClickSave}>Save</Button>
                </div>
            </div>
        </Box>
    </Modal>
}

export default EditCourse; 