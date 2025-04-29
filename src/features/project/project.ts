import { useEffect, useState } from "react";
import { 
    createData, 
    updateData, 
    UpdateStatusData, 
    GetDataById, 
    GetDatas,
    GetDatasByUser,
    deleteData, 
    resetData
} from "../../stores/features/projectSlice";
import {getCountData, resetData2} from "../../stores/features/project2Slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const createDatas = (datas:any) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && message){
            if(!isLoading){
                dispatch(resetData());
                if(datas.link_navigate !== null && datas.link_navigate !== undefined){
                    navigate(datas.link_navigate + message.data.uuid);
                }else{
                    navigate(-1)
                }
            }
        }
    },[isSuccess, message, isLoading])

    useEffect(()=>{
        if(isError && message){
            if(!isLoading){
                dispatch(resetData());
            }
        }
    },[isError, message, isLoading])

    const submit = (e:any) => {
        e.preventDefault()
        dispatch(createData({
            name:datas.name,
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            project_type_uuid:datas.project_type_uuid,
            project_status_uuid:datas.project_status_uuid,
            target_date:datas.target_date
        }))
    }

    return {submit, isLoading}
}

export const updateDatas = (datas:any) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && message){
            if(!isLoading){
                dispatch(resetData());
                if(datas.link_navigate !== null && datas.link_navigate !== undefined){
                    navigate(datas.link_navigate + message.data.uuid);
                }else{
                    navigate(-1)
                }
            }
        }
    },[isSuccess, message, isLoading])

    useEffect(()=>{
        if(isError && message){
            if(!isLoading){
                dispatch(resetData());
            }
        }
    },[isError, message, isLoading])

    const submit = (e:any) => {
        e.preventDefault()
        dispatch(updateData(datas))
    }

    return {isLoading, submit}
}

export const updateStatusDatas = (datas:any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, set_message] = useState<any>(null);

    const {data, isError, isSuccess, isLoading, message:message_project} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && message_project){
            if(!isLoading){
                set_message(message_project);
                dispatch(resetData());
                datas.reload();
            }
        }
    },[isSuccess, message_project, isLoading])

    useEffect(()=>{
        if(isError && message_project){
            if(!isLoading){
                set_message(message_project);
                dispatch(resetData());
            }
        }
    },[isError, message_project, isLoading])

    const click_status = (data_update:any) => {
        dispatch(UpdateStatusData({
            uuid:data_update.project.uuid,
            project_status_uuid:data_update.status.uuid,
        }))
    }

    return {click_status}
}

export const getDatasById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);
    
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetData());
            }
        }
    },[isSuccess, data, isLoading])

    useEffect(()=>{
        const paramsObj : any = {uuid:datas.uuid};
        const searchParams = new URLSearchParams(paramsObj);

        if(datas.uuid !== null && datas.uuid !== undefined){
            dispatch(GetDataById(searchParams.toString()));
        }

    },[datas.uuid])

    const reload = () => {
        const paramsObj : any = {uuid:datas.uuid};
        const searchParams = new URLSearchParams(paramsObj);

        if(datas.uuid !== null && datas.uuid !== undefined){
            dispatch(GetDataById(searchParams.toString()));
        }
    }

    return {dataResult, reload}
}

export const getDatasCount= (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);
    
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project2
    )

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetData2());
            }
        }
    },[isSuccess, data, isLoading])

    useEffect(()=>{
        if(datas && datas.uuid_user !== undefined){
            const paramsObj : any = {uuid_user:datas.uuid_user};
            const searchParams = new URLSearchParams(paramsObj);

            dispatch(getCountData(searchParams.toString()));
        }

        if(datas && datas.uuid_pic !== undefined){
            const paramsObj : any = {uuid_pic:datas.uuid_pic};
            const searchParams = new URLSearchParams(paramsObj);

            dispatch(getCountData(searchParams.toString()));
        }

        if(datas && datas.uuid_user === undefined && datas.uuid_pic === undefined){
            dispatch(getCountData());
        }
    },[datas.uuid_user, datas.uuid_pic])

    return {dataResult}
}

export const getDatas = () => {
    const [dataResult, setDataResult] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [allPage, setAllPage] = useState(5);
    const [count, setCount] = useState(0);
    const [notStatus, setNotStatus] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data.rows);
                countData(data.data.count);
                setCount(data.data.count);
                dispatch(resetData());
            }
        }
    },[isSuccess, data, isLoading])

    useEffect(()=>{
        const paramsObj : any = { page, limit, not_status:notStatus, search};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(GetDatas(searchParams.toString()));

    },[page, limit, notStatus, search])

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
        dataResult, setDataResult,
        page, setPage,
        limit, setLimit,
        allPage, setAllPage,
        count, setCount,
        notStatus, setNotStatus,
        search, setSearch,
        nextPage,
        prevPage
    }
} 

export const getDatasByUser = () => {
    const [dataResult, setDataResult] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [allPage, setAllPage] = useState(5);
    const [count, setCount] = useState(0);
    const [notStatus, setNotStatus] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data.rows);
                countData(data.data.count);
                setCount(data.data.count);
                dispatch(resetData());
            }
        }
    },[isSuccess, data, isLoading])

    useEffect(()=>{
        const paramsObj : any = { page, limit, not_status:notStatus, search};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(GetDatasByUser(searchParams.toString()));

    },[page, limit, notStatus, search])

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
        dataResult, setDataResult,
        page, setPage,
        limit, setLimit,
        allPage, setAllPage,
        count, setCount,
        notStatus, setNotStatus,
        search, setSearch,
        nextPage,
        prevPage
    }
} 

export const deleteDatas = (datas:any) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.project
    )

    useEffect(()=>{
        if(isSuccess && message){
            if(!isLoading){
                dispatch(resetData());
                // if(datas.link_navigate !== null && datas.link_navigate !== undefined){
                //     navigate(datas.link_navigate + message.data.uuid);
                // }else{
                //     navigate(-1)
                // }
            }
        }
    },[isSuccess, message, isLoading])

    useEffect(()=>{
        if(isError && message){
            if(!isLoading){
                dispatch(resetData());
            }
        }
    },[isError, message, isLoading])

    const deleteProject = (data_project:any) => {
        dispatch(deleteData({
            uuid:data_project.uuid
        }))
    }

    return {deleteProject}
}
