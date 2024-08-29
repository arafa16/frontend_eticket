import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs';
import { Menu, Slideover } from "../../base-components/Headless";
import {
  FormLabel,
  FormSelect,
  FormTextarea,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { getStatusNote } from '../../stores/features/statusNoteSlice';
import { resetNoteTicket } from '../../stores/features/noteTicketSlice';
import { createDataNoteTicket } from '../noteTicket/noteTicket';

export const slideOverNote = (datas:any) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<any>(null)
    const [statusNote, setStatusNote] = useState([]);
    
    const dispatch = useDispatch();

    const {data:dataStatusNote, isError:isErrorStatusNote, isSuccess:isSuccessStatusNote, isLoading:isLoadingStatusNote, message:messageStatusNote} = useSelector(
        (state : any) => state.statusNote
    );

    useEffect(()=>{
        if(dataStatusNote && isSuccessStatusNote){
            if(!isLoadingStatusNote){
                setStatusNote(dataStatusNote.data)
                dispatch(resetNoteTicket())
            }
        }
    },[dataStatusNote, isSuccessStatusNote, isLoadingStatusNote])

    useEffect(()=>{
        dispatch(getStatusNote());
    },[])

    const clouseSlice = () => {
        setOpen(false);
    }

    const {ticketUuid, setTicketUuid, description, setDescription, statusNoteUuid, setStatusNoteUuid, submitNoteTicket} = createDataNoteTicket({clouseProses:clouseSlice, reload:datas.reload});

    useEffect(()=>{
        setTicketUuid(datas.ticketUuid)
    },[datas.ticketUuid])

    const form = (
        <div className='text-xs'>
                <Slideover
                    open={open}
                    onClose={() => {
                        clouseSlice();
                    }}
                >
                    <form onSubmit={submitNoteTicket}>
                        <Slideover.Panel>
                        <a
                            onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                clouseSlice();
                            }}
                            className="absolute top-0 left-0 right-auto mt-4 -ml-12"
                            href="#"
                        >
                            <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                        </a>
                    
                        <Slideover.Title>
                            <h2 className=" text-xs mr-auto text-base font-medium">
                                Form Note
                            </h2>
                        </Slideover.Title>
                        {/* form koreksi */}
                        <Slideover.Description>
                            <div className={`grid grid-cols-1 text-xs md:grid-cols-1 gap-6 mb-10`}>
                                <div>
                                    <FormLabel htmlFor="modal-form-4">
                                        Description
                                    </FormLabel>
                                    <FormTextarea
                                        id="modal-form-4"
                                        formTextareaSize="sm"
                                        className='h-32'
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <FormLabel htmlFor="statusNote">Status Note</FormLabel>
                                    <FormSelect
                                        formSelectSize="sm"
                                        aria-label=".form-select-sm example"
                                        name='statusNote'
                                        value={statusNoteUuid}
                                        onChange={(e)=>setStatusNoteUuid(e.target.value)}
                                        >
                                        <option></option>
                                        {statusNote && statusNote.map((data:any, index:any)=>(
                                            <option key={index} value={data.uuid}>{data.name}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                            </div>
                        </Slideover.Description>
                        {/* end: form koreksi */}
                        <Slideover.Footer className={``}>
                            <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="w-20 mr-1"
                            size='sm'
                            >
                            Cancel
                            </Button>
                            <Button
                            variant="primary"
                            type="submit"
                            className="w-auto"
                            size='sm'
                            >
                            Create Note
                            </Button>
                        </Slideover.Footer>
                    </Slideover.Panel>
                    </form>
                </Slideover>
        </div>
    )

    return {
        form, 
        open, setOpen,
        message, setMessage
    }
}