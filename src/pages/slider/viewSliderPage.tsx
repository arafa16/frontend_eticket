import React, { useState } from 'react'
import { getDataSlider } from '../../features/slider/slider'
import clsx from 'clsx';
import { FormInput } from '../../base-components/Form';
import { useNavigate } from 'react-router-dom';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';

const viewSliderPage = () => {
    
    const navigate = useNavigate();

    const {
        datas,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        search, setSearch,
        nextPage, prevPage
    } = getDataSlider();

  return (
    <div>
        <div className="box w-full mt-8">
            <div className="flex flex-col-reverse px-5 py-4 border-b sm:flex-row text-slate-500 border-slate-200/60">
                <div className='flex items-center mx-4'>
                  {/* <FormInput
                    type="text"
                    className="block px-3 py-1 mt-0 mx-2 text-xs"
                    placeholder="search by name"
                    name='search'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  /> */}
                </div>
                <div className="flex items-center justify-end sm:ml-auto">
                    <div className='flex items-center mx-4'>
                        <FormInput
                            type="text"
                            className="block px-1 py-0 mt-0 w-10 mx-2 text-center text-xs"
                            placeholder="0"
                            name='limit'
                            value={datas.count === 0 ? 0 : (limit > datas.count ? datas.count : limit)}
                            onChange={(e:any)=>setLimit(e.target.value)}
                        /> 
                        <p className=' text-center text-xs'>/ {datas.count}</p>
                    </div>
                <div className="text-xs">{page <= allPage ? page : allPage} of {allPage} page </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5"
                        >
                        <Lucide 
                            icon="ChevronLeft" 
                            className="w-4 h-4 hover:cursor-pointer" 
                            onClick={()=>prevPage()}/>
                    </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5"
                        >
                        <Lucide 
                            icon="ChevronRight" 
                            className="w-4 h-4 hover:cursor-pointer"
                            onClick={()=>nextPage()}
                            />
                    </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5 cursor-pointer hover:text-blue-500"
                        onClick={()=>navigate('/slider/create')}
                        >
                        <Lucide icon="FilePlus" className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto sm:overflow-x-visible text-xs">
                {datas && datas.map((data : any, index : any) => (
                    <div 
                        key={index} 
                        className="intro-y"
                        onClick={()=>navigate(`/slider/data/${data.uuid}`)}
                        >
                        <div
                            className={clsx([
                                "transition duration-200 ease-in-out transform cursor-pointer inline-block sm:block border-b border-slate-200/60 dark:border-darkmode-400",
                                "hover:scale-[1.02] hover:relative hover:z-20 hover:shadow-md hover:border-0 hover:rounded",
                            ])}
                        >
                        <div className="flex px-5 py-3">
                            <div className="flex items-center flex-none mr-5 w-32">
                            <div className='w-1/6'>
                                {index+1+((page-1)*limit)}
                            </div>
                            <div
                                className={clsx([
                                "ml-3 truncate w-5/6"
                                ])}
                                >
                                {data && data.name}
                            </div>
                            </div>
                            <div className="w-64 truncate sm:w-96">
                                <span
                                    className={clsx([
                                    "ml-3 truncate"
                                    ])}
                                    >
                                    {data && data.file_name}
                                </span>
                            </div>
                            <div className="w-64 truncate sm:w-96">
                                <span
                                    className={clsx([
                                    "ml-3 truncate"
                                    ])}
                                    >
                                    {data && import.meta.env.VITE_REACT_APP_API_URL+data.file_link}
                                </span>
                            </div>
                            <div className="w-64 truncate sm:w-64 text-center">
                                <span
                                    className={clsx([
                                    "ml-3 truncate"
                                    ])}
                                    >
                                    {data && data.sequence}
                                </span>
                            </div>
                            <div
                            className={clsx([
                                "pl-10 ml-auto whitespace-nowrap"
                            ])}
                            >
                                {data && data.is_delete ? 'delete' : 'active'}
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default viewSliderPage