import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';
import { getDataStatusUserTable } from '../../features/statusUser/statusUser';

const dataStatusUserPage = () => {

    const {
        data, isLoading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    } = getDataStatusUserTable({})

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
                    nextPage={nextPage} 
                    prevPage={prevPage}
                    linkCreate='/statusUser/create'
                    linkUpdate='/statusUser/update/'
                />
            </div>    
        </div>
    )
}

export default dataStatusUserPage