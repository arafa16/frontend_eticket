import React, { useEffect, useState } from 'react'
import { getMeAuth } from '../../features/meAuth';
import { dataTicketUser } from '../../features/ticket/ticketUser';
import Button from '../../base-components/Button';
import { useNavigate } from 'react-router-dom';

const dataTicketUserPage = () => {
    const [status, setNotStatus] = useState<any>([]);

    const navigate = useNavigate();
    
    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketUser({dataMe, limit:10});

    useEffect(()=>{
        setNotSetStatus(status)
    },[status])
    
    return (
        <div className='mb-20'>
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