import React, { useEffect, useState } from 'react'
import { getMeAuth } from '../../features/meAuth';
import { dataTicketUser } from '../../features/ticket/ticketUser';
import Button from '../../base-components/Button';
import { useNavigate } from 'react-router-dom';
import GeneralReportTicket from '../../components/generalReport/generalReportTicket';
import { getDataCountTicket } from '../../features/ticket/ticket';

const dataTicketUserPage = () => {
    const [status, setNotStatus] = useState<any>([]);
    const [stage, setStage] = useState(0);

    const navigate = useNavigate();
    
    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketUser({dataMe, limit:10});

    const {dataResult} = getDataCountTicket({uuid_user:dataMe.uuid});
    
    useEffect(()=>{
        setNotSetStatus(status)
    },[status])

    const clickStatus = (datas:any) => {
        setNotStatus(datas.code);
        setStage(datas.stage);
    }
    
    return (
        <div className='mb-20'>
            <div>
                <GeneralReportTicket
                    clickStatus={clickStatus}
                    stage={stage}
                    data={dataResult}
                />
            </div>
            <div className="flex justify-end mt-8">
                <Button 
                    size='sm'
                    variant='primary'
                    onClick={()=>navigate(`/ticket/create`)}
                >create ticket</Button>
            </div>
            <div>
                {dataTicket}    
            </div>
        </div>
    )
}

export default dataTicketUserPage