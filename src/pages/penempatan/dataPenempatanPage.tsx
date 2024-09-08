import React, { useState } from 'react'
import { getDataPenempatan } from '../../features/penempatan/penempatan';
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';

const dataPenempatanPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);

    const {data, loading} = getDataPenempatan({});
    
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
                    linkCreate='/penempatan/create'
                />
            </div>
        </div>
    )
}

export default dataPenempatanPage