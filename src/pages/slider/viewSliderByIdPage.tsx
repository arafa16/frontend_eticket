import React, { useState } from 'react'
import Button from '../../base-components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDataSlider, getDataSliderById } from '../../features/slider/slider';

const viewSliderByIdPage = () => {
  const {id} = useParams();
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate();

  const {actionDelete} = deleteDataSlider();

  const {data:dataSlider} = getDataSliderById({uuid:id});

  return (
    <div>
      <div className='flex justify-end mt-8 gap-x-4'>
          <Button 
              size='xs'
              variant='primary'
              onClick={()=>navigate(-1)}
              >Back
          </Button>
          <Button 
              size='xs'
              variant='danger'
              onClick={()=>actionDelete({id})}
              >Delete
          </Button>
      </div>
      <div className="w-full box p-8 mt-4">
        <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 '>
            <div>
                <div className="font-medium whitespace-nowrap">
                    Name
                </div>
                <div className="mt-1 text-xs text-slate-500">
                    {dataSlider && dataSlider.name}
                </div>
            </div>
            <div>
                <div className="font-medium whitespace-nowrap">
                    File Name
                </div>
                <div className="mt-1  text-slate-500">
                    {dataSlider && dataSlider.file_name}
                </div>
            </div>
            <div>
                <div className="font-medium whitespace-nowrap">
                    File Link
                </div>
                <div className="mt-1  text-slate-500">
                    {dataSlider && import.meta.env.VITE_REACT_APP_API_URL+dataSlider.file_link}
                </div>
            </div>
        </div>
      </div>
      <div className={`${dataSlider && dataSlider.file_link !== null ? '' : 'hidden'} mt-4 box h-32 px-16 py-2`}>
        <img
            className="h-full w-full"
            src={dataSlider && import.meta.env.VITE_REACT_APP_API_URL+dataSlider.file_link}
        />
      </div>
    </div>
  )
}

export default viewSliderByIdPage