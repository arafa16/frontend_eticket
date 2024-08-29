import { useEffect, useState } from "react";
import { createTicket, GetTicketById, resetTicket, updateTicket } from "../../stores/features/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const createDataTicket = (datas:any) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.ticket
    )

    useEffect(()=>{
        if(isSuccess && message){
            if(!isLoading){
                dispatch(resetTicket());
                if(datas.link_navigate !== null && datas.link_navigate !== undefined){
                    navigate(datas.link_navigate + message.data.uuid);
                }else{
                    navigate(-1)
                }
            }
        }
    },[isSuccess, message, isLoading])

    useEffect(()=>{
        if(isError && message){
            if(!isLoading){
                dispatch(resetTicket());
            }
        }
    },[isError, message, isLoading])

    const submit = (e:any) => {
        e.preventDefault()
        dispatch(createTicket({
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            type_ticket_uuid:datas.type_ticket_uuid,
            status_ticket_uuid:datas.status_ticket_uuid
        }))
    }

    return {submit, isLoading}
}

export const updateDataTicket = (datas:any) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.ticket
    )

    useEffect(()=>{
        if(isSuccess && message){
            if(!isLoading){
                dispatch(resetTicket());
                if(datas.link_navigate !== null && datas.link_navigate !== undefined){
                    navigate(datas.link_navigate + message.data.uuid);
                }else{
                    navigate(-1)
                }
            }
        }
    },[isSuccess, message, isLoading])

    useEffect(()=>{
        if(isError && message){
            if(!isLoading){
                dispatch(resetTicket());
            }
        }
    },[isError, message, isLoading])

    const submit = (e:any) => {
        e.preventDefault()
        dispatch(updateTicket({
            uuid:datas.uuid,
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            type_ticket_uuid:datas.type_ticket_uuid,
        }))
    }

    return {submit}
}

export const getDataTicketById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);
    
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.ticket
    )

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
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

    return {dataResult}
}