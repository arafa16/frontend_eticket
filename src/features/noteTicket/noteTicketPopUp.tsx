import clsx from "clsx"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNoteTicket, resetNoteTicket, updateNoteTicket, deleteNoteTicket } from "../../stores/features/noteTicketSlice";
import { Menu, Tab } from "../../base-components/Headless";
import Lucide from "../../base-components/Lucide";
import { getStatusNote, resetStatusNote } from "../../stores/features/statusNoteSlice";
import { getMeAuth } from "../meAuth";
import { FormInput } from "../../base-components/Form";

export const getDataNoteTicket = (datas: any) => {
    const [dataResult, setDataResult] = useState([]);
    const [statusNote, setStatusNote] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [allPage, setAllPage] = useState(5);
    
    const dispatch = useDispatch();

    //get data auth
    const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.noteTicket
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data.rows)
                datas.reload();
                countData(data.data.count);
                dispatch(resetNoteTicket())
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        if(message && isSuccess){
            if(!isLoading){
                const paramsObj : any = {ticket_uuid:datas.uuid, page, limit};
                 const searchParams = new URLSearchParams(paramsObj);

                dispatch(getNoteTicket(searchParams.toString()))
            }
        }
    },[message, isSuccess, isLoading])

    useEffect(()=>{
        const paramsObj : any = {ticket_uuid:datas.uuid, page, limit};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getNoteTicket(searchParams.toString()))
    },[datas.uuid, page, limit])

    const reload = () => {
        const paramsObj : any = {ticket_uuid:datas.uuid, page, limit};
        const searchParams = new URLSearchParams(paramsObj);

        dispatch(getNoteTicket(searchParams.toString()))
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
    
    const {data:dataStatusNote, isError:isErrorStatusNote, isSuccess:isSuccessStatusNote, isLoading:isLoadingStatusNote, message:messageStatusNote} = useSelector(
        (state : any) => state.statusNote
    );

    useEffect(()=>{
        if(dataStatusNote && isSuccessStatusNote){
            if(!isLoadingStatusNote){
                setStatusNote(dataStatusNote.data)
                dispatch(resetNoteTicket())
            }
        }
    },[dataStatusNote, isSuccessStatusNote, isLoadingStatusNote])

    useEffect(()=>{
        
        dispatch(getStatusNote());
    },[])

    const clickStatusNote : any = (data:any) => {
        dispatch(updateNoteTicket({
            uuid:data.dataNote.uuid,
            ticket_uuid:datas.uuid,
            user_uuid:dataMe.uuid, 
            description:data.dataNote.description, 
            status_note_uuid:data.dataStatus.uuid
        }))
    }

    const deleteNote = (data:any) => {
        dispatch(deleteNoteTicket({uuid:data.uuid}))
    }

    const view = (
        <div className="intro-x">
            <div className={`${allPage > 1 ? '' : 'hidden'} flex flex-col-reverse px-2 mb-4 border-b sm:flex-row text-slate-700 border-slate-200/60`}>
                <div className="flex items-center justify-end sm:ml-auto text-xs">
                    <div>{page <= allPage ? page : allPage} of {allPage} page </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5"
                        >
                        <Lucide 
                            icon="ChevronLeft" 
                            className="w-4 h-4 hover:cursor-pointer" 
                            onClick={()=>prevPage()}
                            />
                    </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5"
                        >
                        <Lucide 
                            icon="ChevronRight" 
                            className="w-4 h-4 hover:cursor-pointer"
                            onClick={()=>nextPage()}
                            />
                    </div>
                </div>
            </div>
            {dataResult && dataResult.map((dataNote:any, index:any)=>(
                <div key={index} className="flex items-center px-5 py-3 mb-3 box">
                    <div className="mr-auto">
                        <div className="mt-1 text-slate-500 text-success capitalize">
                        {dataNote.status_note.name}
                        </div>
                        <div className="mt-1 text-slate-500">
                        {dataNote.description}
                        </div>
                    </div>
                    <Menu>
                      <Menu.Button className={`${datas.isActive !== true ? 'hidden' : ''} w-5 h-5 text-slate-500 text-xs`}>
                        <Lucide icon="MoreVertical" className="w-4 h-4" />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        {statusNote && statusNote.map((dataStatus:any, index:any)=>(
                            <Menu.Item 
                            key={index}
                            onClick={()=>clickStatusNote({dataNote, dataStatus})}
                            >
                                {dataStatus.name}
                            </Menu.Item>
                        ))}
                            <Menu.Item 
                                onClick={()=>deleteNote({uuid:dataNote.uuid})}
                                className={`text-red-500`}
                            >
                                Delete
                            </Menu.Item>
                      </Menu.Items>
                    </Menu>
                </div>
            ))}
            
        </div>
    )

    return {view, reload}
}