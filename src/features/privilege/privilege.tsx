import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrivilegeById, updatePrivilege, resetPrivilege } from "../../stores/features/privilegeSlice";
import { useNavigate } from "react-router-dom";

export const getDataPrivilegeById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.privilege
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetPrivilege());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        if(datas.uuid !== undefined || datas.uuid !== null){
            dispatch(getPrivilegeById({uuid:datas.uuid}));
        }
    },[datas.uuid])

    return {dataResult}
}

export const editDataPrivilegeById = (datas:any) => {   
    const [message, setMessage] = useState<any>(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messagePrivilege} = useSelector(
        (state : any) => state.privilege
    )

    useEffect(()=>{
        if(messagePrivilege && isSuccess){
            if(!isLoading){
                dispatch(resetPrivilege());
                navigate(-1);
            }
        }
    },[messagePrivilege, isLoading, isSuccess]);

    const submit = (e:any) => {
        e.preventDefault();
        dispatch(updatePrivilege(datas));
    }


    return { message, submit }
}