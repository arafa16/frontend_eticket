import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';
import { getDataTypeTicketTable } from '../../features/typeTicket/typeTicket';

const dataTypeTicket = () => {
    const {
      data, isLoading,
      limit, setLimit,
      page, setPage,
      allPage, setAllPage,
      nextPage, prevPage
    } = getDataTypeTicketTable({})

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
                linkCreate='/typeTicket/create'
                linkUpdate='/typeTicket/update/'
            />
          </div>
      </div>
  )
}

export default dataTypeTicket