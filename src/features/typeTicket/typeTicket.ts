import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSelectTypeTicket } from "../../stores/features/typeTicketSlice";


export const getDataTypeTicketSelect = () => {
    const [dataResult, setDataResult] = useState([]);

    const dispatch = useDispatch();

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.typeTicket
    )

    useEffect(()=>{
        if(data && isSuccess){
            if(!isLoading){
                setDataResult(data.data);
            }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getSelectTypeTicket());
    },[])

    return {dataResult}
}