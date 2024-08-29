import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectPenempatan, resetPenempatan } from "../stores/features/penempatanSlice";

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
        }
        }
    },[dataPenempatan, isSuccessPenempatan, isLoadingPenempatan])

    useEffect(()=>{
        dispatch(getSelectPenempatan());
    },[])

    return {penempatanSelect, loadingPenempatan}
}