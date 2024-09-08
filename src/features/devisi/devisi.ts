import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectDevisi, getDevisiTable, resetDevisi, createDevisi } from "../../stores/features/devisiSlice";
import { useNavigate } from "react-router-dom";

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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

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

export const createDataDevisi = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataDevisi, isError:isErrorDevisi, isSuccess:isSuccessDevisi, isLoading:isLoadingDevisi, message:messageDevisi} = useSelector(
        (state : any) => state.devisi
    )

    useEffect(()=>{
        if(messageDevisi && isSuccessDevisi){
            if(!isLoadingDevisi){
                set_message(messageDevisi.data);
                dispatch(resetDevisi());
                navigate(-1);
            }
        }
    },[messageDevisi, isSuccessDevisi, isLoadingDevisi])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createDevisi(datas))
    }

    return {message, createAction}
}