import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../base-components/Button';
import { dataTicketAll } from '../../features/ticket/ticketAll';
import GeneralReportTicket from '../../components/generalReport/generalReportTicket';
import { getDataCountTicket } from '../../features/ticket/ticket';

const dataTicketPage = () => {
    const [status, setNotStatus] = useState<any>([]);
    const [stage, setStage] = useState(0);

    const navigate = useNavigate();

    const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketAll({limit:10, link_view:'/ticket/admin/data/'});

    const {dataResult} = getDataCountTicket({});

    useEffect(()=>{
        setNotSetStatus(status)
    },[status]);

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
                    onClick={()=>navigate(`/ticket/admin/create`)}
                >create ticket</Button>
            </div>
            <div>
                {dataTicket}    
            </div>
        </div>
    )
}

export default dataTicketPage