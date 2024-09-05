import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1'
import { getDataDevisiTable } from '../../features/devisi/devisiSelect'

const dataDevisiPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);
    
    const {data, loading} = getDataDevisiTable({})

    return (
        <div>
            <div className='mt-8'>
                <TableTemplate1 
                    datas={data}
                    limit={limit}
                    page={page}
                    allPage={allPage}
                />
            </div>
        </div>
    )
}

export default dataDevisiPage