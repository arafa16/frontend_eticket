import React, { useState } from 'react'
import TableTemplate1 from '../../components/tableTemplate/tableTemplate1';
import { getDataTypeTicketTable } from '../../features/typeTicket/typeTicket';

const dataTypeTicket = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);

    const {data, isLoading} = getDataTypeTicketTable({})

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
                linkCreate='/typeTicket/create'
            />
          </div>
      </div>
  )
}

export default dataTypeTicket