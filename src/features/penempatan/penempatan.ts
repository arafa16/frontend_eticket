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
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const {data:dataPenempatan, isError:isErrorPenempatan, isSuccess:isSuccessPenempatan, isLoading:isLoadingPenempatan, message:messagePenempatan} = useSelector(
        (state : any) => state.penempatan
    )

    useEffect(()=>{
        if(dataPenempatan && isSuccessPenempatan){
            if(!isLoadingPenempatan){
                setData(dataPenempatan.data);
                setLoading(false)
                dispatch(resetPenempatan());
            }
        }
    },[dataPenempatan, isSuccessPenempatan, isLoadingPenempatan])

    useEffect(()=>{
        dispatch(getPenempatanTable(datas));
    },[])

    return {data, loading}
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