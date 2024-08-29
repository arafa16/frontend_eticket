import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserSelect, resetUser } from "../../stores/features/userSlice";
import { getExecutor, resetExecutor } from "../../stores/features/executorSlice";

export const getDataExecutorSelect = () => {
    const [dataResult, setDataResult] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageUser} = useSelector(
        (state : any) => state.executor
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetExecutor());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getExecutor());
    },[])

    return {dataResult}

}

export const getDataUserSelect = () => {
    const [dataResult, setDataResult] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageUser} = useSelector(
        (state : any) => state.user
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetUser());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getUserSelect());
    },[])

    return {dataResult}

}