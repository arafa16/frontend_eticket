import { formTicket } from '../../features/ticket/formTicket'
import { statusTicketView } from '../../features/statusTicket/statusTicketView';
import Button from '../../base-components/Button';
import { useNavigate } from 'react-router-dom';
import { createDataTicket } from '../../features/ticket/ticket';
import { getMeAuth } from '../../features/meAuth';
import { getDataStatusTicketByCode } from '../../features/statusTicket/statusTicket';
import LoadingIcon from '../../base-components/LoadingIcon';

const createTicketPage = () => {

    const navigate = useNavigate();

    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {status, message:messageTicket} = statusTicketView({uuid:null, status_ticket_id:null, reload:null, isActive:false});

    const {form, typeTicketId, setTypeTicketId, description, setDescription} = formTicket();

    const {dataResult:statusTicket} = getDataStatusTicketByCode({code:2})

    const {submit : createTicket, isLoading:isLoadingSubmit} = createDataTicket({
        // executor_uuid:dataMe.uuid,
        description:description,
        type_ticket_uuid:typeTicketId,
        status_ticket_uuid:statusTicket && statusTicket.uuid,
        link_navigate:null
    })

    
    return (
        <div className='mt-6'>
            <form onSubmit={createTicket}>
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
                    >
                        {isLoadingSubmit ? <LoadingIcon icon="circles" className="w-4 h4" color="white"  /> : 'Submit'}
                    </Button>
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

export default createTicketPage