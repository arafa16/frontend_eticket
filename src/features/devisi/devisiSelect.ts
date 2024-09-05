import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectDevisi, getDevisiTable, resetDevisi } from "../../stores/features/devisiSlice";

export const getDevisiSelect = () => {
    const dispatch = useDispatch();
    const [devisiSelect, setDevisiSelect] = useState([]);
    const [loadingDevisi, setLoadingDevisi] = useState(true)

    const {data:dataDevisi, isError:isErrorDevisi, isSuccess:isSuccessDevisi, isLoading:isLoadingDevisi, message:messageDevisi} = useSelector(
        (state : any) => state.devisi
    )

    useEffect(()=>{
        if(dataDevisi && isSuccessDevisi){
            if(!isLoadingDevisi){
                setDevisiSelect(dataDevisi.data);
                setLoadingDevisi(false)
                dispatch(resetDevisi());
            }
        }
    },[dataDevisi, isSuccessDevisi, isLoadingDevisi])

    useEffect(()=>{
        dispatch(getSelectDevisi());
    },[])

    return {devisiSelect, loadingDevisi}
}

export const getDataDevisiTable = (datas:any) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const {data:dataDevisi, isError:isErrorDevisi, isSuccess:isSuccessDevisi, isLoading:isLoadingDevisi, message:messageDevisi} = useSelector(
        (state : any) => state.devisi
    )

    useEffect(()=>{
        if(dataDevisi && isSuccessDevisi){
            if(!isLoadingDevisi){
                setData(dataDevisi.data);
                setLoading(false)
                dispatch(resetDevisi());
            }
        }
    },[dataDevisi, isSuccessDevisi, isLoadingDevisi])

    useEffect(()=>{
        dispatch(getDevisiTable(datas));
    },[])

    return {data, loading}
}