import React, { useEffect, useState } from 'react'
import GeneralReportProject from '../../components/generalReport/generalReportProject';
import TableTemplate2 from '../../components/tableTemplate/tableTemplate2';
import { getDatasCount, getDatas } from '../../features/project/project'

const dataProjectAdminPage = () => {
  // const [status, setNotStatus] = useState<any>([]);
  const [stage, setStage] = useState(0);
  
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
  } = getDatas();

  const clickStatus = (datas:any) => {
      setNotStatus(datas.code);
      setStage(datas.stage);
  }
  
  return (
    <div>
      <div>
          <GeneralReportProject
              clickStatus={clickStatus}
              stage={stage}
              data={dataResult}
          />
      </div>
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

export default dataProjectAdminPage