import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { 
    createData, 
    getDataSelect, 
    getDatas, 
    getDataById, 
    getDataTable, 
    resetData, 
    updateData 
} from "../../stores/features/projectStatusSlice";
import { useNavigate } from "react-router-dom";

export const getDataAll = () => {
    const [dataResult, setDataResult] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.projectStatus
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetData());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getDatas());
    },[])

    return {dataResult}
}

export const getDatasSelect = () => {
    const [dataResult, setDataResult] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.projectStatus
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetData());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getDataSelect());
    },[])

    return {dataResult}
}

export const getDatasById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.projectStatus
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetData());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getDataById({uuid:datas.uuid}));
    },[datas.uuid])

    return {dataResult}
}

export const getDatasTable = (datas:any) => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);

    const dispatch = useDispatch();

    const {data:dataResult, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.projectStatus
    )

    useEffect(()=>{
        if(dataResult && isSuccess){
            if(!isLoading){
                setData(dataResult.data);
                countData(dataResult.data.count);
                dispatch(resetData());
            }
        }
    },[dataResult, isSuccess, isLoading])

    useEffect(()=>{
        const paramsObj : any = {limit, page};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getDataTable(searchParams));
    },[limit, page])

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
        data, isLoading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    }
}

export const createDatas = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataResult, isError, isSuccess, isLoading, message:messageResult} = useSelector(
        (state : any) => state.projectStatus
    )

    useEffect(()=>{
        if(messageResult && isSuccess){
            if(!isLoading){
                set_message(messageResult.data);
                dispatch(resetData());
                navigate(-1);
            }
        }
    },[messageResult, isSuccess, isLoading])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createData(datas))
    }

    return {message, createAction}
}

export const updateDatas = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataResult, isError, isSuccess, isLoading, message:messageResult} = useSelector(
        (state : any) => state.projectStatus
    )

    useEffect(()=>{
        if(messageResult && isSuccess){
            if(!isLoading){
                set_message(messageResult.data);
                dispatch(resetData());
                navigate(-1);
            }
        }
    },[messageResult, isSuccess, isLoading])

    const updateAction = (e:any) => {
        e.preventDefault();
        dispatch(updateData(datas))
    }

    return {message, updateAction}
}