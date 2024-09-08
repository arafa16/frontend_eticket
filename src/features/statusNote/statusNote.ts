import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStatusNote, getStatusNoteTable, resetStatusNote } from "../../stores/features/statusNoteSlice";
import { useNavigate } from "react-router-dom";

export const getDataStatusNoteTable = (datas:any) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const {data:dataStatusNote, isError:isErrorDevisi, isSuccess, isLoading:isLoadingStatusNote, message:messageDevisi} = useSelector(
        (state : any) => state.statusNote
    )

    useEffect(()=>{
        if(dataStatusNote && isSuccess){
            if(!isLoadingStatusNote){
                setData(dataStatusNote.data);
                setLoading(false)
                dispatch(resetStatusNote());
            }
        }
    },[dataStatusNote, isSuccess, isLoadingStatusNote])

    useEffect(()=>{
        dispatch(getStatusNoteTable(datas));
    },[])

    return {data, loading}
}

export const createDataStatusNote = (datas:any) => {
    const [message, set_message] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data:dataStatusNote, isError:isErrorStatusNote, isSuccess, isLoading, message:messageStatusNote} = useSelector(
        (state : any) => state.statusNote
    )

    useEffect(()=>{
        if(messageStatusNote && isSuccess){
            if(!isLoading){
                set_message(messageStatusNote.data);
                dispatch(resetStatusNote());
                navigate(-1);
            }
        }
    },[messageStatusNote, isSuccess, isLoading])

    const createAction = (e:any) => {
        e.preventDefault();
        dispatch(createStatusNote(datas))
    }

    return {message, createAction}
}