import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDataDevisiById, updateDataDevisi } from '../../features/devisi/devisi';
import Button from '../../base-components/Button';
import FormAttribute from '../../components/formTemplate/formAttribute';

const updateDevisiPage = () => {
    const {id} = useParams();

    const [name, set_name] = useState('');
    const [sequence, set_sequence] = useState(0);
    const [is_select, set_is_select] = useState(0);
    const [is_active, set_is_active] = useState(1);

    const navigate = useNavigate();

    const {dataResult} = getDataDevisiById({uuid:id});

    useEffect(()=>{
        if(dataResult !== null){
            setDataValue(dataResult);
        }
    },[dataResult])

    const setDataValue = (data:any) => {
        set_name(data && data.name);
        set_sequence(data && data.sequence);
        set_is_select(data && data.is_select ? 1 : 0);
        set_is_active(data && data.is_active ? 1 : 0);
    }

    const {message, updateAction} = updateDataDevisi({
        uuid:id, name, sequence, is_select, is_active
    })
    
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
                <FormAttribute 
                    name={name}
                    set_name={set_name}
                    sequence={sequence}
                    set_sequence={set_sequence}
                    is_select={is_select}
                    set_is_select={set_is_select}
                    is_active={is_active}
                    set_is_active={set_is_active}
                    submit={updateAction}
                />
            </div>
        </div>
    )
}

export default updateDevisiPage