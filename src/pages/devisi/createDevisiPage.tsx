import React, { useState } from 'react'
import FormAttribute from '../../components/formTemplate/formAttribute'
import { createDataDevisi } from '../../features/devisi/devisi';
import Button from '../../base-components/Button';
import { useNavigate } from 'react-router-dom';

const createDevisiPage = () => {
  const [name, set_name] = useState('');
  const [sequence, set_sequence] = useState(0);
  const [is_select, set_is_select] = useState(0);
  const [is_active, set_is_active] = useState(1);

  const navigate = useNavigate();
  
  const {message, createAction} = createDataDevisi({
    name,
    sequence,
    is_select, 
    is_active
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
            <FormAttribute 
              name={name}
              set_name={set_name}
              sequence={sequence}
              set_sequence={set_sequence}
              is_select={is_select}
              set_is_select={set_is_select}
              is_active={is_active}
              set_is_active={set_is_active}
              submit={createAction}
            />
        </div>
    </div>
  )
}

export default createDevisiPage