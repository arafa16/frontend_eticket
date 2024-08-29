import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectDevisi, resetDevisi } from "../stores/features/devisiSlice";

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
        }
        }
    },[dataDevisi, isSuccessDevisi, isLoadingDevisi])

    useEffect(()=>{
        dispatch(getSelectDevisi());
    },[])

    return {devisiSelect, loadingDevisi}
}