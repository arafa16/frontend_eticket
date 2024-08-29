import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, EmailResetPassword, RegisterUser, GetTokenReset, resetAuth} from "../stores/features/authSlice";
import { ResetPassword } from "../stores/features/meSlice";

export const getLoginAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data:dataLogin, isError:isErrorLogin, isSuccess:isSuccessLogin, isLoading:isLoadingLogin, message:messageLogin} = useSelector(
        (state : any) => state.auth
    )

    useEffect(()=>{
        if(isSuccessLogin && dataLogin){
        dispatch(resetAuth());
        if(!isLoadingLogin){
            navigate('/')
        }
        }
    },[isSuccessLogin, dataLogin, isLoadingLogin])

    useEffect(()=>{
        if(isErrorLogin && messageLogin && !isLoadingLogin){
            setMessage(messageLogin.data)
            dispatch(resetAuth());
        }
    },[isErrorLogin, messageLogin, isLoadingLogin])

    const submitLogin = (e :any) => {
        e.preventDefault();
        dispatch(LoginUser({
        email, password
        }))
    }

    return {email, setEmail, password, setPassword, message, isLoadingLogin, submitLogin}
}

export const getRegisterAuth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nomorHp, setNomorHp] = useState('');
    const [devisiId, setDevisiId] = useState('');
    const [penempatanId, setPenempatanId] = useState('');
    const [data, setData] = useState<any>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data:dataRegister, isError:isErrorRegister, isSuccess:isSuccessRegister, isLoading:isLoadingRegister, message:messageRegister} = useSelector(
        (state : any) => state.auth
    )

    useEffect(()=>{
        if(isSuccessRegister && dataRegister && !isLoadingRegister){
            setName('');
            setEmail('');
            setPassword('');
            setNomorHp('');
            setDevisiId('');
            setPenempatanId('');
            setData(dataRegister);
            dispatch(resetAuth());
        }
    },[isSuccessRegister, dataRegister, isLoadingRegister])

    useEffect(()=>{
        if(isErrorRegister && messageRegister && !isLoadingRegister){
            setData(messageRegister.data);
            dispatch(resetAuth());
        }
    },[isErrorRegister, messageRegister, isLoadingRegister])

    const submitRegister = (e :any) => {
        e.preventDefault();
        dispatch(RegisterUser({
            name,
            email, 
            password,
            nomor_hp:nomorHp,
            devisi_id:devisiId,
            penempatan_id:penempatanId
        }))
    }
    return {
        name, setName,
        email, setEmail, 
        password, setPassword,
        nomorHp, setNomorHp, 
        devisiId, setDevisiId,
        penempatanId, setPenempatanId,
        data,setData,
        isLoadingRegister, 
        submitRegister
    }
}

export const sendEmailAuth = () => {
    const [email, setEmail] = useState('');
    const [data, setData] = useState<any>(null);

    const dispatch = useDispatch();

    const {data:dataSend, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.auth
    )

    useEffect(()=>{
        if(isSuccess && dataSend && !isLoading){
            setEmail('');
            setData(dataSend);
            dispatch(resetAuth());
        }
    },[isSuccess, dataSend, isLoading])

    useEffect(()=>{
        if(isError && message && !isLoading){
            setData(message.data);
            dispatch(resetAuth());
        }
    },[isError, message, isLoading])

    const sendEmailReset = (e :any) => {
        e.preventDefault();
        dispatch(EmailResetPassword({
            email
        }))
    }
    return {
        email, setEmail, 
        data,setData,
        isLoading,
        sendEmailReset
    }
}

export const getTokenAuth = () => {
    const [token, setToken] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const dispatch = useDispatch();

    const {data:dataSend, isError, isSuccess, isLoading, message:messageToken} = useSelector(
        (state : any) => state.auth
    )

    useEffect(()=>{
        if(isSuccess && dataSend && !isLoading){
            setData(dataSend);
            // setMessage(dataSend.message);
            dispatch(resetAuth());
        }
    },[isSuccess, dataSend, isLoading])

    useEffect(()=>{
        if(isError && messageToken && !isLoading){
            setMessage(messageToken.data.data);
            dispatch(resetAuth());
        }
    },[isError, messageToken, isLoading])

    useEffect(()=>{
        if(token !== null || undefined)
        dispatch(GetTokenReset({
            token
        }))
    },[token]);

    return {
        token, setToken, 
        data,setData,
        message,
        isLoading,
    }
}

export const resetByTokenAuth = (datas:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [token, setToken] = useState<any>(null);
    const [data, setData] = useState<any>(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {data:dataReset, isError, isSuccess, isLoading, message} = useSelector(
        (state : any) => state.me
    )

    useEffect(()=>{
        if(isSuccess && dataReset && !isLoading){
            setData(dataReset);
            setEmail('');
            setPassword('');
            setConfPassword('');
            dispatch(resetAuth());

            setTimeout(()=>{
                navigate('/login');
            }, 5000)
        }
    },[isSuccess, dataReset, isLoading])

    useEffect(()=>{
        if(isError && message && !isLoading){
            setData(message.data);
            dispatch(resetAuth());
        }
    },[isError, message, isLoading])

    useEffect(()=>{
        if(token !== null || undefined)
        dispatch(GetTokenReset({
            token
        }))
    },[token]);

    const resetPassword = (e :any) => {
        e.preventDefault();
        dispatch(ResetPassword({
            token:datas.token,
            password,
            confPassword
        }))
    }

    return {
        email, setEmail,
        password, setPassword,
        confPassword, setConfPassword,
        token, setToken, 
        data,setData,
        isLoading,
        resetPassword
    }
}

