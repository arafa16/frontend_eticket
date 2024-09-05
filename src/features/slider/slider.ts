import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSliderTable, CreateSlider, resetSlider, deleteSlider, getSliderById } from "../../stores/features/sliderSlice";

export const getDataSlider = () => {
    const [datas, setDatas] = useState<any>([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(0);
    const [search, setSearch] = useState('');

    const {data:dataSlide, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.slider
    )

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess && dataSlide){
            if(!isLoading){
                setDatas(dataSlide.data.rows);
                countData(dataSlide.data.count);
                dispatch(resetSlider());
            }
        }
    },[isSuccess, dataSlide, isLoading])

    useEffect(()=>{
        dispatch(GetSliderTable());
    },[])

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
        datas,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        search, setSearch,
        nextPage, prevPage
    }
}

export const createDataSlider = (datas:any) => {
    const [message, setMessage] = useState<any>(null)
    const {data:dataSlide, isError, isSuccess, isLoading, message:messageSlider} = useSelector(
        (state : any) => state.slider
    )

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess && messageSlider){
            if(!isLoading){
                setMessage(messageSlider);
                navigate(-1)
                dispatch(resetSlider());
            }
        }
    },[isSuccess, messageSlider, isLoading])

    console.log(datas);

    const uploadSlider = (e :any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', datas.file);
        formData.append('sequence', datas.sequence);
        formData.append('name', datas.name);

        dispatch(CreateSlider(formData));
    }

    return {message, uploadSlider}
}

export const deleteDataSlider = () => {

    const {data:dataSlide, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.slider
    )

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess && message){
            if(!isLoading){
                navigate(-1);
                dispatch(resetSlider());
            }
        }
    },[isSuccess, message, isLoading])

    const actionDelete = (datas:any) => {
        dispatch(deleteSlider({uuid:datas.id}));
    }

    return {actionDelete}
}

export const getDataSliderById = (datas:any) => {
    const [data, setData] = useState<any>(null)
    const {data:dataSlide, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.slider
    )

    const dispatch = useDispatch();

    useEffect(()=>{
        if(isSuccess && dataSlide){
            if(!isLoading){
                setData(dataSlide.data)
                dispatch(resetSlider());
            }
        }
    },[isSuccess, dataSlide, isLoading])

    useEffect(()=>{
        dispatch(getSliderById({uuid:datas.uuid}));
    },[])

    return {data}
}