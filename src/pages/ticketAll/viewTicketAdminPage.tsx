import { getDataTicketView } from '../../features/ticket/ticketView';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../base-components/Button';
import { statusTicketView } from '../../features/statusTicket/statusTicketView';
import { getMessageShow } from '../../features/messageShow';
import { getDataNoteTicket } from '../../features/noteTicket/noteTicketPopUp';
import { historyView } from '../../features/history/historyView';
import { slideOverNote } from '../../features/ticket/slideOverNote';

const viewTicketAdminPage = () => {
  const {id} = useParams();

  const navigate = useNavigate();

  const {dataResult, statusTicketId, reload, history, view} = getDataTicketView({uuid:id});

  const {status, message:messageTicket} = statusTicketView({uuid:id, status_ticket_id:statusTicketId, reload, isActive:true});

  const {view:viewDataNoteTicket, reload:reloadDataNoteTicket} = getDataNoteTicket({uuid:id, reload, isActive:true});

  //message
  const messageShow = getMessageShow(messageTicket);

  const {view:viewHistory} = historyView({history});

  const {form, open, setOpen } = slideOverNote({ticketUuid:id, reload:reloadDataNoteTicket});

  return (
    <div className='mt-6'>
      {form}
      {messageShow}
      <div className='flex justify-end gap-x-4'>
        <Button 
          size='sm'
          variant='primary'
          onClick={()=>navigate('/ticket/admin/data')}
        >Back</Button>
        <Button 
          size='sm'
          variant='primary'
          onClick={()=>navigate(`/ticket/admin/edit/${id}`)}
        >Edit</Button>
      </div>
      <div className='grid grid-cols-12 2xl:pl-6 gap-x-6 gap-y-4 mt-4'>
        <div className='col-span-12 md:col-span-6 xl:col-span-12 2xl:col-span-12'>
          {status}
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-12'>
          {view}
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-3 2xl:col-span-12 text-xs'>
          <Button 
            size='sm'
            variant='outline-primary'
            className="w-full mb-4"
            onClick={()=>setOpen(!open)}
          >create note</Button>
          {viewDataNoteTicket}
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-12 text-xs'>
        {viewHistory}
      </div>
      </div>
      
    </div>
  )
}

export default viewTicketAdminPage