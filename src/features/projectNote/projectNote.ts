import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { 
    createData,
    getDatas,
    updateData,
    resetDatas,
    deleteData
} from "../../stores/features/projectNoteSlice";
import { useNavigate } from "react-router-dom";

export const createDatas = (datas:any) => {
    const [message, set_message] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataType, isError, isSuccess, isLoading, message:messageProjectNote} = useSelector(
        (state : any) => state.projectNote
    )

    useEffect(()=>{
        if(messageProjectNote && isSuccess){
            if(!isLoading){
                set_message(messageProjectNote.data);
                dispatch(resetDatas());
                datas.reload();
                setOpen(false)
            }
        }
    },[messageProjectNote, isSuccess, isLoading])

    const createAction = (datas:any) => {
        dispatch(createData(datas))
    }

    return {message, open, setOpen, createAction}
}

export const getDataByProjectId = (datas:any) => {

    const [dataResult, setDataResult] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [allPage, setAllPage] = useState(5);
    const [count, setCount] = useState(0);
    const [notStatus, setNotStatus] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const {data:dataNote, isError, isSuccess, isLoading, message:messageProjectNote} = useSelector(
        (state : any) => state.projectNote
    )

    useEffect(()=>{
        if(dataNote && isSuccess){
            if(!isLoading){
                setDataResult(dataNote.data.rows)
                // datas.reload();
                countData(dataNote.data.count);
                dispatch(resetDatas())
            }
        }
    },[dataNote, isSuccess, isLoading]);

    useEffect(()=>{
        if(datas.project_uuid !== null){
            const paramsObj : any = { page, limit, not_status:notStatus, search, project_uuid:datas.project_uuid};
            const searchParams = new URLSearchParams(paramsObj);
    
            dispatch(getDatas(searchParams.toString()));
        }
        

    },[page, limit, notStatus, search, datas.project_uuid])

    const reload = () => {
        if(datas.project_uuid !== null){
            const paramsObj : any = { page, limit, not_status:notStatus, search, project_uuid:datas.project_uuid};
            const searchParams = new URLSearchParams(paramsObj);
    
            dispatch(getDatas(searchParams.toString()));
        }
    }

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
        prevPage,
        reload
    }
}

export const updateDatas = (datas:any) => {

    const dispatch = useDispatch();
    const {data:dataNote, isError, isSuccess, isLoading, message:messageProjectNote} = useSelector(
        (state : any) => state.projectNote
    )

    useEffect(()=>{
        if(messageProjectNote && isSuccess){
            if(!isLoading){
                // setDataResult(data.data.rows)
                dispatch(resetDatas())
                datas.reload();
            }
        }
    },[messageProjectNote, isSuccess, isLoading])

    const updateStatus = (data_update:any) => {
        dispatch(updateData({
            project_note_uuid:data_update.project_note_uuid,
            project_uuid:data_update.project_uuid, 
            description:data_update.description, 
            project_note_status_uuid:data_update.project_note_status_uuid
        }))
    }

    return {updateStatus}
}

export const deleteDatas = (datas:any) => {
    const [message, setMessage] = useState<any>(null);
    const dispatch = useDispatch();
    
    const {data:dataNote, isError, isSuccess, isLoading, message:messageProjectNote} = useSelector(
        (state : any) => state.projectNote
    )

    useEffect(()=>{
        if(messageProjectNote && isSuccess){
            if(!isLoading){
                // setDataResult(data.data.rows)
                dispatch(resetDatas())
                datas.reload();
            }
        }
    },[messageProjectNote, isSuccess, isLoading])

    const deleteNote = (data_note :any) => {
        dispatch(deleteData({
            uuid:data_note.uuid
        }))
    }

    return {message, deleteNote}
}