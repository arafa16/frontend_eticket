import { getDataTicketView } from '../../features/ticket/ticketView';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../base-components/Button';
import { statusTicketView } from '../../features/statusTicket/statusTicketView';
import { getMessageShow } from '../../features/messageShow';
import { getDataNoteTicket } from '../../features/noteTicket/noteTicketPopUp';
import { historyView } from '../../features/history/historyView';
import UploadAttachment from '../../components/formTemplate/uploadAttachment';
import { uploadDataAttachment } from '../../features/attachment/uploadAttachment';

const viewTicketPage = () => {
  const {id} = useParams();

  const navigate = useNavigate();

  const {dataResult, statusTicketId, reload, history, view} = getDataTicketView({uuid:id});

  const {status, clickToProcess, statusTicket, message:messageTicket} = statusTicketView({uuid:id, status_ticket_id:statusTicketId, reload, isActive:false});

  const {view:viewDataNoteTicket} = getDataNoteTicket({uuid:id, reload, isActive:false});

  const {modal:modalAttachment, deleteFileAttachment, showModal, setShowModal} = uploadDataAttachment({uuid:id, reload});
  
  //message
  const messageShow = getMessageShow(messageTicket);

  const {view:viewHistory} = historyView({history});

  return (
    <div className='mt-6'>
      {messageShow}
      {modalAttachment}
      <div className='flex justify-end gap-x-4'>
        <Button 
          size='sm'
          variant='primary'
          onClick={()=>navigate(-1)}
        >Back</Button>
        <Button 
          size='sm'
          variant='primary'
          onClick={()=>clickToProcess(2)}
          className={`${statusTicket === 2 ? 'hidden' : ''}`}
        >Set To Pengajuan</Button>
      </div>
      <div className='grid grid-cols-12 2xl:pl-6 gap-x-6 gap-y-4 mt-4'>
        <div className='col-span-12 md:col-span-6 xl:col-span-12 2xl:col-span-12'>
          {status}
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-12'>
          <div className='w-full flex justify-end mb-4'>
            <UploadAttachment 
              datas={dataResult}
              deleteFile={deleteFileAttachment}
              setShowModal={setShowModal}
            />
          </div>
          <div className='w-full'>
            {view}
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-3 2xl:col-span-12 text-xs'>
          {viewDataNoteTicket}
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-12 text-xs'>
        {viewHistory}
      </div>
      </div>
      
    </div>
  )
}

export default viewTicketPage