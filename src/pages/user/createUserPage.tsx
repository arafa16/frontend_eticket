import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../base-components/Button';
import FormUser from '../../components/formTemplate/formUser';
import { createDataUser } from '../../features/user/user';

const createUserPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [devisiId, setDevisiId] = useState('');
    const [penempatanId, setPenempatanId] = useState('');
    const [nomorHp, setNomorHp] = useState('');
    const [statusUserId, setStatusUserId] = useState('');
    const [isExecutor, setIsExecutor] = useState(0);

    const navigate = useNavigate();

    const { submit:createUser } = createDataUser({
        name:name,
        email:email,
        devisi_uuid:devisiId,
        penempatan_uuid:penempatanId,
        nomor_hp:nomorHp,
        status_user_uuid:statusUserId,
        is_executor:isExecutor,
        password:password
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
                    password={password}
                    setPassword={setPassword}
                    viewPassword={true}
                    submit={createUser}
                />
            </div>
        </div>
    )
}

export default createUserPage