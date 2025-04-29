import React from 'react'
import TableTemplate2 from '../../components/tableTemplate/tableTemplate2'
import { getDatasCount, getDatasByUser } from '../../features/project/project'

const projectTablePicPage = () => {
    
    const {dataResult} = getDatasCount({});

    const {
        dataResult:dataProject, 
        setDataResult,
        page, setPage,
        limit, setLimit,
        allPage, setAllPage,
        count, setCount,
        notStatus, setNotStatus,
        search, setSearch,
        nextPage,
        prevPage
      } = getDatasByUser();

  return (
    <div>
        <div className='mt-6'>
            <TableTemplate2
            datas={dataProject}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            allPage={allPage}
            count={count}
            search={search}
            setSearch={setSearch}
            linkCreate={'/project/admin/create'}
            linkView={'/project/admin/data/'}
            />
      </div>
    </div>
  )
}

export default projectTablePicPage