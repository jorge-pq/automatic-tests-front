import React from 'react';
import {Pagination as MUIPaginator} from '@mui/material';


const Pagination = ({totalPages, page, handleChange}) => {
    return (
        <MUIPaginator count={totalPages} showFirstButton showLastButton color="primary" page={parseInt(page)} onChange={handleChange} />
    );
};

export default Pagination;