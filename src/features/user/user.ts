import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUserSelect, resetUser, updateUser, createUser } from "../../stores/features/userSlice";
import { getExecutor, resetExecutor } from "../../stores/features/executorSlice";
import { useNavigate } from "react-router-dom";

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

export const getDataUserById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);

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
        if(datas.uuid !== undefined || datas.uuid !== null){
            dispatch(getUserById({uuid:datas.uuid}));
        }
    },[datas.uuid])

    return {dataResult}
}

export const editUserById = (datas:any) => {   
    const [message, setMessage] = useState<any>(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageUser} = useSelector(
        (state : any) => state.user
    )

    useEffect(()=>{
        if(messageUser && isSuccess){
            if(!isLoading){
                dispatch(resetUser());
                navigate(-1);
            }
        }
    },[messageUser, isLoading, isSuccess]);

    const submit = (e:any) => {
        e.preventDefault();
        dispatch(updateUser(datas));
    }


    return { message, submit }
}

export const createDataUser = (datas:any) => {   
    const [message, setMessage] = useState<any>(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageUser} = useSelector(
        (state : any) => state.user
    )

    useEffect(()=>{
        if(messageUser && isSuccess){
            if(!isLoading){
                dispatch(resetUser());
                navigate(-1);
            }
        }
    },[messageUser, isLoading, isSuccess]);

    const submit = (e:any) => {
        e.preventDefault();
        dispatch(createUser(datas));
    }


    return { message, submit }
}