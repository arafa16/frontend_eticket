import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';
import { getDataStatusNoteTable } from '../../features/statusNote/statusNote';

const dataStatusNotePage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);
    
    const {data, loading} = getDataStatusNoteTable({})

    return (
        <div>
            <div className='mt-8'>
                <TableTemplate1 
                    datas={data}
                    limit={limit}
                    setLimit={setLimit}
                    page={page}
                    setPage={setPage}
                    allPage={allPage}
                    linkCreate='/statusNote/create'
                />
            </div>
        </div>
    )
}

export default dataStatusNotePage