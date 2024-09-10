import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1'
import { getDataDevisiTable } from '../../features/devisi/devisi'

const dataDevisiPage = () => {
    const {
        data, loading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    } = getDataDevisiTable({})

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
                    linkCreate='/devisi/create'
                    linkUpdate='/devisi/update/'
                />
            </div>
        </div>
    )
}

export default dataDevisiPage