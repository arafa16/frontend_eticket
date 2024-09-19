import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMeAuth } from '../../features/meAuth';
import { dataTicketPic } from '../../features/ticket/ticketPic';
import { getDataCountTicket } from '../../features/ticket/ticket';
import GeneralReportTicket from '../../components/generalReport/generalReportTicket';

const dataTicketPicPage = () => {
    const [status, setNotStatus] = useState<any>([]);
    const [stage, setStage] = useState(0);

    const navigate = useNavigate();
    
    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketPic({dataMe, limit:10});

    const {dataResult} = getDataCountTicket({uuid_pic:dataMe.uuid});
    
    useEffect(()=>{
        setNotSetStatus(status)
    },[status])

    const clickStatus = (datas:any) => {
        setNotStatus(datas.code);
        setStage(datas.stage);
    }

  return (
    <div>
      <div>
        <GeneralReportTicket
            clickStatus={clickStatus}
            stage={stage}
            data={dataResult}
        />
      </div>
      <div className='mt-4'>
        {dataTicket}    
      </div>
    </div>
  )
}

export default dataTicketPicPage