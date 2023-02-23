import React, {FC, memo} from 'react';
import {Button} from "@mui/material";

type PropsType = {
    title: string
    onClick: () => void
    className?: string
}

export const    OutlinedBtn: FC<PropsType> = memo(({className,onClick, title}) => {
    return <Button className={className} color={'inherit'} onClick={onClick} variant="outlined">{title}</Button>
});

