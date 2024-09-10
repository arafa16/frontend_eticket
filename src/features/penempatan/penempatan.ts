import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectPenempatan, getPenempatanTable, resetPenempatan, createPenempatan } from "../../stores/features/penempatanSlice";
import { useNavigate } from "react-router-dom";

export const getPenempatanSelect = () => {
    const dispatch = useDispatch();
    const [penempatanSelect, setPenempatanSelect] = useState([]);
    const [loadingPenempatan, setLoadingPenempatan] = useState(true)
    
    const {data:dataPenempatan, isError:isErrorPenempatan, isSuccess:isSuccessPenempatan, isLoading:isLoadingPenempatan, message:messagePenempatan} = useSelector(
        (state : any) => state.penempatan
    )

    useEffect(()=>{
        if(dataPenempatan && isSuccessPenempatan){
        if(!isLoadingPenempatan){
            setPenempatanSelect(dataPenempatan.data);
            setLoadingPenempatan(false)
            dispatch(resetPenempatan());
        }
        }
    },[dataPenempatan, isSuccessPenempatan, isLoadingPenempatan])

    useEffect(()=>{
        dispatch(getSelectPenempatan());
    },[])

    return {penempatanSelect, loadingPenempatan}
}

export const getDataPenempatan = (datas:any) => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();

    const {data:dataPenempatan, isError:isErrorPenempatan, isSuccess:isSuccessPenempatan, isLoading:isLoadingPenempatan, message:messagePenempatan} = useSelector(
        (state : any) => state.penempatan
    )

    useEffect(()=>{
        if(dataPenempatan && isSuccessPenempatan){
            if(!isLoadingPenempatan){
                setData(dataPenempatan.data);
                countData(dataPenempatan.data.count);
                setLoading(false)
                dispatch(resetPenempatan());
            }
        }
    },[dataPenempatan, isSuccessPenempatan, isLoadingPenempatan])

    useEffect(()=>{
        const paramsObj : any = {limit, page};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getPenempatanTable(searchParams));
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
        data, loading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    }
}

export const createDataPenempatan = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataPenempatan, isError:isErrorPenempatan, isSuccess, isLoading, message:messagePenempatan} = useSelector(
        (state : any) => state.penempatan
    )

    useEffect(()=>{
        if(messagePenempatan && isSuccess){
            if(!isLoading){
                set_message(messagePenempatan.data);
                dispatch(resetPenempatan());
                navigate(-1);
            }
        }
    },[messagePenempatan, isSuccess, isLoading])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createPenempatan(datas))
    }

    return {message, createAction}
}