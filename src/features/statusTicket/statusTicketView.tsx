import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getStatusTicket, resetStatusTicket } from "../../stores/features/statusTicketSlice";
import { UpdateStatusTicket, resetTicket } from "../../stores/features/ticketSlice";

export const statusTicketView = (datas:any) => {
    const [statusTicket, setStatusTicket] = useState<any>(0)
    const [dataResult, setDataResult] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageStatusTicket} = useSelector(
        (state : any) => state.statusTicket
    )

    const {data:dataTicket, isError:isErrorTicket, isSuccess:isSuccessTicket, isLoading:isLoadingTicket, message:messageTicket} = useSelector(
        (state : any) => state.ticket
    )

    useEffect(()=>{
        if(datas.status_ticket_id !== null){
            setStatusTicket(datas.status_ticket_id)
        }
    },[datas.status_ticket_id])

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetStatusTicket());
            }
        }
    },[isSuccess, data, isLoading]);

    useEffect(()=>{
        dispatch(getStatusTicket());
    },[]);

    useEffect(()=>{
        if(isSuccessTicket && messageTicket){
            if(!isLoadingTicket){
                setMessage(messageTicket);
                if(datas.reload !== null){
                    datas.reload();
                }
                dispatch(resetTicket());
            }
        }
    },[isSuccessTicket, messageTicket, isLoadingTicket]);

    const clickStatus = (status_ticket_uuid:any) => {
        if(datas.isActive === true){
            dispatch(UpdateStatusTicket({
                uuid:datas.uuid,
                status_ticket_uuid:status_ticket_uuid
            }));
        }
    }
    
    const status = (
        <div className="flex justify-end text-xs box">
            {dataResult && dataResult.map((data :any, index:any)=>(
                <div 
                    key={index} 
                    className={`${data.id === statusTicket ? 'bg-slate-0 text-slate-600' : 'bg-slate-100 text-slate-300'} capitalize px-4 py-1 intro-x dark:bg-darkmode-600 hover:cursor-pointer`}
                    onClick={()=>clickStatus(data.uuid)}
                    >
                    {data.name}
                </div>
            ))}
        </div>
    )

    return {status, message}
}