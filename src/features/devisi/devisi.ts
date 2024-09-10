import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectDevisi, getDevisiTable, resetDevisi, createDevisi, getDevisiById, updateDevisi } from "../../stores/features/devisiSlice";
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

export const getDataDevisiById = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.devisi
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetDevisi());
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getDevisiById({uuid:datas.uuid}));
    },[datas.uuid])

    return {dataResult}
}

export const getDataDevisiTable = (datas:any) => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const {data:dataDevisi, isError:isErrorDevisi, isSuccess:isSuccessDevisi, isLoading:isLoadingDevisi, message:messageDevisi} = useSelector(
        (state : any) => state.devisi
    )

    useEffect(()=>{
        if(dataDevisi && isSuccessDevisi){
            if(!isLoadingDevisi){
                setData(dataDevisi.data);
                countData(dataDevisi.data.count);
                setLoading(false)
                dispatch(resetDevisi());
            }
        }
    },[dataDevisi, isSuccessDevisi, isLoadingDevisi])

    useEffect(()=>{
        const paramsObj : any = {limit, page};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getDevisiTable(searchParams));
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
        data, loading,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        nextPage, prevPage
    }
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

export const updateDataDevisi = (datas:any) => {
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

    const updateAction = (e:any) => {
        e.preventDefault();
        dispatch(updateDevisi(datas))
    }

    return {message, updateAction}
}