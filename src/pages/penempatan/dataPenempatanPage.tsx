import React, { useState } from 'react'
import { getDataPenempatan } from '../../features/penempatan/penempatan';
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';

const dataPenempatanPage = () => {
    const {
        data, loading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    } = getDataPenempatan({});
    
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
                    linkCreate='/penempatan/create'
                    linkUpdate='/penempatan/update/'
                />
            </div>
        </div>
    )
}

export default dataPenempatanPage