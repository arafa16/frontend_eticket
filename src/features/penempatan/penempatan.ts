import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectPenempatan, getPenempatanTable, resetPenempatan } from "../../stores/features/penempatanSlice";

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