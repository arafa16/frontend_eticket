import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createTypeTicket, getSelectTypeTicket, getTypeTicketTable, resetTypeTicket } from "../../stores/features/typeTicketSlice";
import { useNavigate } from "react-router-dom";


export const getDataTypeTicketSelect = () => {
    const [dataResult, setDataResult] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.typeTicket
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetTypeTicket());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getSelectTypeTicket());
    },[])

    return {dataResult}
}

export const getDataTypeTicketTable = (datas:any) => {
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const {data:dataType, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.typeTicket
    )

    useEffect(()=>{
        if(dataType && isSuccess){
            if(!isLoading){
                setData(dataType.data);
                dispatch(resetTypeTicket());
            }
        }
    },[dataType, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getTypeTicketTable(datas));
    },[])

    return {data, isLoading}
}

export const createDataTypeTicket = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataStatus, isError, isSuccess, isLoading, message:messageStatusUser} = useSelector(
        (state : any) => state.statusUser
    )

    useEffect(()=>{
        if(messageStatusUser && isSuccess){
            if(!isLoading){
                set_message(messageStatusUser.data);
                dispatch(resetTypeTicket());
                navigate(-1);
            }
        }
    },[messageStatusUser, isSuccess, isLoading])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createTypeTicket(datas))
    }

    return {message, createAction}
}