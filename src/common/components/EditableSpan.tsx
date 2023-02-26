import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";


type propsType = {
    title: string
    onChange: (value: string) => void
    withIcon?: boolean
}

export const EditableSpan: FC<propsType> = memo(({withIcon = true, title, onChange}) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activatedEditMode = () => {
        setEditMode(true)
        setValue(title)
    }

    const activatedViewMode = () => {
        if (value.trim() !== '' && value.length <= 30) {
            setEditMode(false)
            onChange(value)
        }

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onKeyDownEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim() !== '' && value.length <= 20) {
            setEditMode(false)
            onChange(value)
        }
    }


    return editMode
        ? <TextField
            sx={{padding: '5px 0'}}
            label={value} variant="standard"
            // onBlurCapture={activatedViewMode}
            value={value}
            color={'secondary'}
            id="outlined-error"
            error={value.trim() === '' || value.length >= 30}
            autoFocus
            onChange={onChangeTitleHandler}
            onKeyDown={onKeyDownEnterHandler}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <Button
                        sx={{padding: '0', minWidth: '50px', marginBottom: '3px'}}
                        variant={"contained"}
                        onClick={activatedViewMode}
                        color={'secondary'}
                    >
                        SAVE
                    </Button>
                </InputAdornment>
            }}/>
        : <div>
            <span onClick={activatedEditMode}>{title}</span>
            {withIcon && <BorderColorIcon
                cursor={'pointer'}
                onClick={activatedEditMode}
                fontSize={'small'}/>}
        </div>
})