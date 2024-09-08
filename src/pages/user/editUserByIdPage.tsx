import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../base-components/Button';
import { editUserById, getDataUserById } from '../../features/user/user';
import FormUser from '../../components/formTemplate/formUser';

const editUserByIdPage = () => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [devisiId, setDevisiId] = useState('');
    const [penempatanId, setPenempatanId] = useState('');
    const [nomorHp, setNomorHp] = useState('');
    const [statusUserId, setStatusUserId] = useState('');
    const [isExecutor, setIsExecutor] = useState(0);
    
    const navigate = useNavigate();

    const {dataResult} = getDataUserById({uuid:id});

    useEffect(()=>{
        if(dataResult !== null){
            setDataUser(dataResult);
        }
        
    },[dataResult]);

    const setDataUser = (datas:any) => {
        setName(datas.name);
        setEmail(datas.email);
        setDevisiId(datas.devisi.uuid);
        setPenempatanId(datas.penempatan.uuid);
        setNomorHp(datas.nomor_hp);
        setStatusUserId(datas.status_user.uuid);
        setIsExecutor(datas.is_executor ? 1 : 0);
    }

    const { submit:updateUser } = editUserById({
        uuid:id,
        name:name,
        email:email,
        devisi_uuid:devisiId,
        penempatan_uuid:penempatanId,
        nomor_hp:nomorHp,
        status_user_uuid:statusUserId,
        is_executor:isExecutor,
    });


    return (
        <div>
            <div className='flex justify-end mt-8 gap-x-4'>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(-1)}
                    >Back
                </Button>
            </div>
            <div className='mt-4'>
                <FormUser 
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    devisiId={devisiId}
                    setDevisiId={setDevisiId}
                    penempatanId={penempatanId}
                    setPenempatanId={setPenempatanId}
                    nomorHp={nomorHp}
                    setNomorHp={setNomorHp}
                    statusUserId={statusUserId}
                    setStatusUserId={setStatusUserId}
                    isExecutor={isExecutor}
                    setIsExecutor={setIsExecutor}
                    viewPassword={false}
                    submit={updateUser}
                />
            </div>
        </div>
    )
}

export default editUserByIdPage