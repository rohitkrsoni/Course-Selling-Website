import { TextField, Typography } from "@mui/material"

const InputLabel = ({ label, value, setValue }) => {
    return <Typography variant="h6" sx={{
        'display': 'flex',
        'justifyContent': 'space-between',
        'alignItems': 'center'

    }}>
        {label}:
        <TextField variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} sx={{
            'width': '70%'
        }}> </TextField >
    </Typography>
}

export default InputLabel;