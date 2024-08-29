import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMeAuth } from '../../features/meAuth';
import { dataTicketPic } from '../../features/ticket/ticketPic';

const dataTicketPicPage = () => {
    const [status, setNotStatus] = useState<any>([1,4,6]);

    const navigate = useNavigate();
    
    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketPic({dataMe, limit:10});

    useEffect(()=>{
      setNotSetStatus(status)
    },[status])

  return (
    <div>
      <div>
        {dataTicket}    
      </div>
    </div>
  )
}

export default dataTicketPicPage