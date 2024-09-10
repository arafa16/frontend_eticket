import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createTypeTicket, getSelectTypeTicket, getTypeTicketById, getTypeTicketTable, resetTypeTicket, updateTypeTicket } from "../../stores/features/typeTicketSlice";
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

export const getDataTypeTicketById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);

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
        dispatch(getTypeTicketById({uuid:datas.uuid}));
    },[datas.uuid])

    return {dataResult}
}

export const getDataTypeTicketTable = (datas:any) => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);

    const dispatch = useDispatch();

    const {data:dataType, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.typeTicket
    )

    useEffect(()=>{
        if(dataType && isSuccess){
            if(!isLoading){
                setData(dataType.data);
                countData(dataType.data.count);
                dispatch(resetTypeTicket());
            }
        }
    },[dataType, isSuccess, isLoading])

    useEffect(()=>{
        const paramsObj : any = {limit, page};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getTypeTicketTable(searchParams));
    },[limit, page])

    //table
    const countData = (allData : any) =>{
        const count = allData / limit;
        setAllPage(Math.ceil(count))
    }

    const nextPage = () => {
        if(page < allPage){
            const count = page + 1;
            setPage(count);
        }
    }

    const prevPage = () => {
        if(page > 1){
            const count = page - 1;
            setPage(count);
        }
    }

    return {
        data, isLoading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    }
}

export const createDataTypeTicket = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataType, isError, isSuccess, isLoading, message:messageTypeTicket} = useSelector(
        (state : any) => state.typeTicket
    )

    useEffect(()=>{
        if(messageTypeTicket && isSuccess){
            if(!isLoading){
                set_message(messageTypeTicket.data);
                dispatch(resetTypeTicket());
                navigate(-1);
            }
        }
    },[messageTypeTicket, isSuccess, isLoading])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createTypeTicket(datas))
    }

    return {message, createAction}
}

export const updateDataTypeTicket = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataType, isError, isSuccess, isLoading, message:messageTypeTicket} = useSelector(
        (state : any) => state.typeTicket
    )

    useEffect(()=>{
        if(messageTypeTicket && isSuccess){
            if(!isLoading){
                set_message(messageTypeTicket.data);
                dispatch(resetTypeTicket());
                navigate(-1);
            }
        }
    },[messageTypeTicket, isSuccess, isLoading])

    const updateAction = (e:any) => {
        e.preventDefault();
        dispatch(updateTypeTicket(datas))
    }

    return {message, updateAction}
}