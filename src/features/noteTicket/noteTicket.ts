import { useEffect, useState } from "react"
import { getMeAuth } from "../meAuth";
import { useDispatch, useSelector } from "react-redux";
import { createNoteTicket, resetNoteTicket } from "../../stores/features/noteTicketSlice";

export const createDataNoteTicket = (datas:any) => {
    const [ticketUuid, setTicketUuid] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [statusNoteUuid, setStatusNoteUuid] = useState<any>('');

    const dispatch = useDispatch();
    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.noteTicket
    )

    useEffect(()=>{
        if(message && isSuccess){
            if(!isLoading){
                if(datas.reload !== null){
                    datas.reload();
                }
                if(datas.clouseProses !== null){
                    datas.clouseProses();
                }
                setDescription('');
                setStatusNoteUuid('');
                dispatch(resetNoteTicket())
            }
        }
    },[message, isSuccess, isLoading])

    const submitNoteTicket : any = (e:any) => {
        e.preventDefault();
        dispatch(createNoteTicket({
            ticket_uuid:ticketUuid,
            user_uuid:dataMe.uuid, 
            description:description, 
            status_note_uuid:statusNoteUuid
        }))
    }

    return {ticketUuid, setTicketUuid, description, setDescription, statusNoteUuid, setStatusNoteUuid, submitNoteTicket}

}