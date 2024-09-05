import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserById, resetUser } from "../../stores/features/userSlice";

export const viewUserById = (datas:any) => {
    const [data, setData] = useState<any>(null);

    const dispatch = useDispatch();

    const {data:dataUser, isError, isSuccess, isLoading, message:messageUser} = useSelector(
        (state : any) => state.user
    )

    useEffect(()=>{
        if(dataUser && isSuccess){
            if(!isLoading){
                console.log(dataUser, 'user')
                setData(dataUser.data);
                dispatch(resetUser());
            }
        }
    },[data, isSuccess, isLoading]);

    useEffect(()=>{
            dispatch(getUserById({uuid:datas.uuid}));
    },[datas.uuid])

    const view = (
        <div className="w-full box p-8">
            <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 '>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Name
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                        {data && data.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Email
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.email}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Devisi
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.devisi && data.devisi.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Devisi
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.penempatan && data.penempatan.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Nomor Hp
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.nomor_hp}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Status User
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.status_user && data.status_user.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Is Executor
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.is_executor ? 'yes' : 'no'}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Is Delete
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.is_delete ? 'yes' : 'no'}
                    </div>
                </div>
            </div>
        </div>
    )

    return {view}
}