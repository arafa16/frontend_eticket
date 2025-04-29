import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {uploadAttachment, deleteAttachment, downloadAttachment, resetData} from '../../stores/features/projectAttachmentSLice'
import fileDownload from "js-file-download";

export const uploadAttachmentProject = (datas:any) => {
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState<any>(null);
    const [file, setFile] = useState<any>(null);
    const [project_uuid, set_project_uuid] = useState<any>(null);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageAttachment} = useSelector(
        (state : any) => state.projectAttachment
    )

    useEffect(()=>{
        if(isSuccess && messageAttachment){
            if(!isLoading){
                setFile(null);
                setMessage(messageAttachment)
                dispatch(resetData());
                setShowModal(false)
                setFile(false)
                datas.reload();
            }
        }
    },[isSuccess, messageAttachment, isLoading])

    const chageFile = (e : any) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const submitAttachment = (e :any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        dispatch(uploadAttachment({
            uuid:project_uuid,
            formData
        }))
    }

    return {submitAttachment, chageFile, message, file, setFile, project_uuid, set_project_uuid, showModal, setShowModal}
}

export const downloadAttachments = () => {
    const dispatch = useDispatch();

    const clickDownload = (data_attachment:any) => {
        dispatch(downloadAttachment({
            file_link:data_attachment.file_link,
            file_name:data_attachment.file_name
        }))
    }

    return {clickDownload}
}

export const deleteDataAttachment = (datas:any) => {
    const [message, setMessage] = useState<any>(null);
    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message:messageAttachment} = useSelector(
        (state : any) => state.projectAttachment
    )

    useEffect(()=>{
        if(isSuccess && messageAttachment){
            if(!isLoading){
                setMessage(messageAttachment)
                dispatch(resetData());
                datas.reload();
            }
        }
    },[isSuccess, messageAttachment, isLoading])

    const deleteData = (data_attachment :any) => {
        dispatch(deleteAttachment({
            uuid:data_attachment.uuid
        }))
    }

    return {message, deleteData}
}