import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getSelectDevisi, resetDevisi } from "../../stores/features/devisiSlice";
import { getStatusUserSelect, resetStatusUser } from "../../stores/features/statusUserSlice";

export const getDataStatusUserSelect = () => {
    const dispatch = useDispatch();
    const [statusUserSelect, setStatusUserSelect] = useState([]);
    const [loadingStatusUser, setLoadingStatusUser] = useState(true)

    const {data, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.statusUser
    )

    useEffect(()=>{
        if(data && isSuccess){
        if(!isLoading){
            setStatusUserSelect(data.data);
            dispatch(resetStatusUser());
            setLoadingStatusUser(false)
        }
        }
    },[data, isSuccess, isLoading])

    useEffect(()=>{
        dispatch(getStatusUserSelect());
    },[])

    return {statusUserSelect, loadingStatusUser}
}