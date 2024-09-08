import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getStatusTicketByCode, resetStatusTicket2 } from "../../stores/features/statusTicket2Slice";

export const getDataStatusTicketByCode = (datas:any) => {
    const [dataResult, setDataResult] = useState<any>(null);

    const {data, isError, isSuccess, isLoading, message:messageStatusTicket} = useSelector(
        (state : any) => state.statusTicket2
    )
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isSuccess && data){
            if(!isLoading){
                setDataResult(data.data);
                dispatch(resetStatusTicket2());
            }
        }
    },[isSuccess, data, isLoading]);

    useEffect(()=>{
        if(datas.code !== null && datas.code !== undefined){
            dispatch(getStatusTicketByCode({code:datas.code}));
        }
    },[datas.code]);

    return {dataResult}

}

