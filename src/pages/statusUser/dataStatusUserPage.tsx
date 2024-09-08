import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';
import { getDataStatusUserTable } from '../../features/statusUser/statusUser';

const dataStatusUserPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);
    
    const {data, isLoading} = getDataStatusUserTable({})

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
                    linkCreate='/statusUser/create'
                />
            </div>    
        </div>
    )
}

export default dataStatusUserPage