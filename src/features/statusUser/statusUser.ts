import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getSelectDevisi, resetDevisi } from "../../stores/features/devisiSlice";
import { createStatusUser, getStatusUserSelect, getStatusUserTable, resetStatusUser } from "../../stores/features/statusUserSlice";
import { useNavigate } from "react-router-dom";

export const getDataStatusUserSelect = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const {data:dataStatus, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.statusUser
    )

    useEffect(()=>{
        if(dataStatus && isSuccess){
        if(!isLoading){
            setData(dataStatus.data);
            dispatch(resetStatusUser());
            setLoading(false)
        }
        }
    },[dataStatus, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getStatusUserSelect());
    },[])

    return {data, loading}
}

export const getDataStatusUserTable = (datas:any) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);

    const {data:dataStatus, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.statusUser
    )

    useEffect(()=>{
        if(dataStatus && isSuccess){
            if(!isLoading){
                setData(dataStatus.data);
                countData(dataStatus.data.count);
                dispatch(resetStatusUser());
            }
        }
    },[dataStatus, isSuccess, isLoading])

    useEffect(()=>{
        const paramsObj : any = {limit, page};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getStatusUserTable(searchParams));
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

export const createDataStatusUser = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataStatus, isError, isSuccess, isLoading, message:messageStatusUser} = useSelector(
        (state : any) => state.statusUser
    )

    useEffect(()=>{
        if(messageStatusUser && isSuccess){
            if(!isLoading){
                set_message(messageStatusUser.data);
                dispatch(resetStatusUser());
                navigate(-1);
            }
        }
    },[messageStatusUser, isSuccess, isLoading])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createStatusUser(datas))
    }

    return {message, createAction}
}