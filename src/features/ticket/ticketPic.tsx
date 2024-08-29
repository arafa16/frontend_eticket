import Table from "../../base-components/Table";
import _ from "lodash";
import Lucide from "../../base-components/Lucide";
import { useSelector, useDispatch } from "react-redux";
import { GetTicketPic, resetTicket } from "../../stores/features/ticketSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../base-components/Form";

export const dataTicketPic = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [allPage, setAllPage] = useState(5);
    const [notStatus, setNotStatus] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.ticket
    )

    useEffect(()=>{
        setLimit(datas.limit)
    },[datas.limit])

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
                countData(data.data.count);
                dispatch(resetTicket());
            }
        }
    },[isSuccess, data, isLoading])

    useEffect(()=>{
        const paramsObj : any = {uuid:datas.dataMe.uuid, page, limit, notStatus};
        const searchParams = new URLSearchParams(paramsObj);

        if(datas.dataMe !== null && datas.dataMe !== undefined && datas.dataMe.length !== 0){
            dispatch(GetTicketPic(searchParams.toString()));
        }

    },[datas.dataMe, page, limit, notStatus])

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

    const dataTicket:any = (
        <div className="intro-y col-span-12">
            <div className="flex flex-col-reverse px-5 py-4 border-b sm:flex-row text-slate-700 border-slate-200/60">
                <div className="flex items-center justify-end sm:ml-auto text-xs">
                    <div className="mx-5">
                        <FormInput
                            formInputSize="xs"
                            id="file"
                            type="text"
                            name='file'
                            className='w-10'
                            value={limit}
                            onChange={(e :any)=>setLimit(e.target.value)}
                        />
                    </div>
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
            <Table className="border-spacing-y-[10px] border-separate">
            <Table.Tbody>
                {dataResult && dataResult.rows.map((data:any, key:any) => (
                <Table.Tr key={key} className="intro-x">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-xs whitespace-nowrap">
                        {key + 1}
                    </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-24 py-0 bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <a
                        href=""
                        className="underline text-xs decoration-dotted whitespace-nowrap"
                    >
                        {data.code_ticket}
                    </a>
                    </Table.Td>
                    <Table.Td className="max-sm:hidden lg: first:rounded-l-md last:rounded-r-md bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium text-xs whitespace-nowrap">
                        {data.user_id !== null ? data.user.name : 'no name'}
                    </div>
                    </Table.Td>
                    <Table.Td className="max-sm:hidden first:rounded-l-md last:rounded-r-md bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium text-xs whitespace-nowrap">
                        {data.type_ticket.name}
                    </div>
                    </Table.Td>
                    <Table.Td className="max-sm:hidden first:rounded-l-md last:rounded-r-md bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <div className="mt-1 text-xs text-slate-500">
                            {dayjs(data.date).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </Table.Td>
                    <Table.Td className="max-sm:hidden first:rounded-l-md last:rounded-r-md bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <span className="px-2 py-0 text-xs">
                        {data.status_ticket.name}
                        </span>
                    </Table.Td>
                    <Table.Td className="max-sm:hidden first:rounded-l-md last:rounded-r-md bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <span className="px-2 py-0 text-xs">
                        {data.executor_id !== null ? data.executor.name : ' waiting executor'}
                        </span>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border border-r-0 border-l-0 first:border-l last:border-r border-slate-200 dark:bg-darkmode-600 dark:border-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                        <p
                            className="flex items-center text-xs mr-3 whitespace-nowrap hover:cursor-pointer"
                            onClick={()=>navigate(`/ticket/pic/${data.uuid}`)}
                        >
                        <Lucide icon="FileText" className="w-4  h-4 mr-1" /> View
                        Details
                        </p>
                    </div>
                    </Table.Td>
                </Table.Tr>
                ))}
            </Table.Tbody>
            </Table>
        </div>
    )

    return{dataTicket, setNotStatus}
}
