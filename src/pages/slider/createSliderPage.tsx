import React, { useState } from 'react'
import FormSlider from '../../components/formTemplate/formSlider'
import Button from '../../base-components/Button'
import { useNavigate } from 'react-router-dom'
import { createDataSlider } from '../../features/slider/slider'

const createSliderPage = () => {
    const navigate = useNavigate();
    const [name, set_name] = useState('');
    const [file, set_file] = useState(null);
    const [file_name, set_file_name] = useState(null);
    const [file_link, set_file_link] = useState<any>(null);
    const [sequence, set_sequence] = useState(0);

    const {message, uploadSlider} = createDataSlider({
        file,
        name,
        sequence
    });

    const changeFile = (e : any) => {
        const file_upload = e.target.files[0];
        set_file_link(URL.createObjectURL(file_upload));
        set_file(file_upload);
    }

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
                <FormSlider 
                    name={name}
                    set_name={set_name}
                    changeFile={changeFile}
                    file_name={file_name}
                    set_file_name={set_file_name}
                    file_link={file_link}
                    set_file_link={set_file_link}
                    sequence={sequence}
                    set_sequence={set_sequence}
                    submit={uploadSlider}
                />
            </div>
            <div className={`${file_link !== null ? '' : 'hidden'} mt-4 box h-32 px-16 py-2`}>
                <img
                    className="h-full w-full"
                    src={file_link}
                />
            </div>
            
        </div>
    )
}

export default createSliderPage