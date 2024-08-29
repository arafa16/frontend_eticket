import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../base-components/Button';
import { dataTicketAll } from '../../features/ticket/ticketAll';

const dataTicketPage = () => {
    const [status, setNotStatus] = useState<any>([]);

    const navigate = useNavigate();

    const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketAll({limit:10, link_view:'/ticket/admin/data/'});

    useEffect(()=>{
        setNotSetStatus(status)
    },[status])
    
    return (
        <div className='mb-20'>
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