import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTicketById, resetTicket } from "../../stores/features/ticketSlice";
import dayjs from "dayjs";

export const getDataTicketView = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);
    const [statusTicketId, setStatusTicketId] = useState(0);
    const [history, setHistory] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.ticket
    )

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
                setHistory(data.history)
                setStatusTicketId(data.data.status_ticket_id);
                dispatch(resetTicket());
            }
        }
    },[isSuccess, data, isLoading])

    useEffect(()=>{
        const paramsObj : any = {uuid:datas.uuid};
        const searchParams = new URLSearchParams(paramsObj);

        if(datas.uuid !== null && datas.uuid !== undefined){
            dispatch(GetTicketById(searchParams.toString()));
        }

    },[datas.uuid])

    const reload = () => {
        const paramsObj : any = {uuid:datas.uuid};
        const searchParams = new URLSearchParams(paramsObj);

        if(datas.uuid !== null && datas.uuid !== undefined){
            dispatch(GetTicketById(searchParams.toString()));
        }
    }

    const view = (
        <div className="w-full box text-xs p-4">
            <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10'>
                <div>
                    <div className="mt-1 font-medium underline text-slate-700">
                        {dataResult && dataResult.code_ticket}
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 mt-10 border-b border-slate-200/60 dark:border-darkmode-400 pb-10'>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Type Ticket
                    </div>
                    <div className="mt-1 text-slate-500 text-justify">
                        {dataResult && dataResult.type_ticket.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Create Date
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dayjs(dataResult && dataResult.date).format('YYYY-MM-DD HH:mm:ss') }
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Description
                    </div>
                    <div className="mt-1 text-slate-500 text-justify">
                        {dataResult && dataResult.description}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        PIC
                    </div>
                    <div className="mt-1 text-slate-500 text-justify">
                        {dataResult && dataResult.executor_id !== null ? dataResult.executor.name : 'waiting response'}
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-10 mt-10 '>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Name
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dataResult && dataResult.user.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Email
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dataResult && dataResult.user.email}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Nomor Hp
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dataResult && dataResult.user.nomor_hp}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Devisi
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dataResult && dataResult.user.devisi.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Penempatan
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dataResult && dataResult.user.penempatan.name}
                    </div>
                </div>
            </div>
            
        </div>
        
    )

    return {dataResult, statusTicketId, reload, history, view};
}