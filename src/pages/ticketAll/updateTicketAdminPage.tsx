import { formTicketAdmin } from '../../features/ticket/formTicketAdmin'
import { statusTicketView } from '../../features/statusTicket/statusTicketView';
import Button from '../../base-components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { createDataTicket, getDataTicketById, updateDataTicket } from '../../features/ticket/ticket';
import { getMeAuth } from '../../features/meAuth';
import { getDataStatusTicketByCode } from '../../features/statusTicket/statusTicket';
import { useEffect } from 'react';

const updateTicketAdminPage = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const {dataResult:dataTicket} = getDataTicketById({uuid:id})

    // console.log(dataTicket, 'data ticket');

    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {status, message:messageTicket} = statusTicketView({uuid:null, status_ticket_id:null, reload:null, isActive:false});

    const {form, userId, setUserId, typeTicketId, setTypeTicketId, executorId, setExecutorId, description, setDescription} = formTicketAdmin();


    useEffect(()=>{
        if(dataTicket !== null){
            console.log(dataTicket, 'data ticket');
            console.log(dataTicket.user.uuid, 'data ticket');
            setUserId(dataTicket.user && dataTicket.user.uuid);
            setTypeTicketId(dataTicket.type_ticket && dataTicket.type_ticket.uuid);
            setDescription(dataTicket.description);
            setExecutorId(dataTicket.executor && dataTicket.executor.uuid)
        }
    },[dataTicket])

    const {submit : updateTicket} = updateDataTicket({
        uuid:id,
        user_uuid:userId,
        executor_uuid:executorId,
        description:description,
        type_ticket_uuid:typeTicketId,
        link_navigate:'/ticket/admin/data/'
    })

    return (
        <div className='mt-6'>
            <form onSubmit={updateTicket}>
                <div className='flex justify-end gap-x-2'>
                    <Button 
                    size='xs'
                    variant='primary'
                    type='button'
                    onClick={()=>navigate(-1)}
                    >Back</Button>
                    <Button 
                    size='xs'
                    variant='primary'
                    type='submit'
                    >Submit</Button>
                </div>
                <div className='grid grid-cols-12 2xl:pl-6 gap-x-4 gap-y-4 mt-4'>
                    <div className='col-span-12 md:col-span-6 xl:col-span-12 2xl:col-span-12'>
                        {status}
                    </div>
                    <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-12'>
                        {form}
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default updateTicketAdminPage