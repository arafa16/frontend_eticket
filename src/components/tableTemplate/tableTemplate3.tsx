import React from 'react'
import { FormInput } from '../../base-components/Form'
import Lucide from '../../base-components/Lucide';
import clsx from 'clsx';
import dayjs from 'dayjs';

const tableTemplate3 = (props:any) => {
    const {
        search, setSearch,
        datas,
        count,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        prevPage, nextPage,
        create,
        view
    } = props;

    return (
        <div>
            <div className="box w-full">
                <div className="flex flex-col-reverse px-5 py-4 border-b sm:flex-row text-slate-500 border-slate-200/60">
                    <div className='flex items-center '>
                        <FormInput
                            type="text"
                            className="block px-3 py-1 mt-0 mx-2 text-xs"
                            placeholder="search by name"
                            name='search'
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-x-4 sm:ml-auto">
                        <div className='flex items-center'>
                            <FormInput
                                type="text"
                                className="block px-1 py-0 mt-0 w-10 mx-2 text-center text-xs"
                                placeholder="0"
                                name='limit'
                                value={count === 0 ? 0 : (limit > count ? count : limit)}
                                onChange={(e:any)=>setLimit(e.target.value)}
                            /> 
                            <p className=' text-center text-xs'>/ {count}</p>
                        </div>
                        <div className="text-xs">{page <= allPage ? page : allPage} of {allPage} page </div>
                        <div
                            className="w-5 h-5"
                            >
                            <Lucide 
                                icon="ChevronLeft" 
                                className="w-4 h-4 hover:cursor-pointer" 
                                onClick={()=>prevPage()}/>
                        </div>
                        <div
                            className="w-5 h-5"
                            >
                            <Lucide 
                                icon="ChevronRight" 
                                className="w-4 h-4 hover:cursor-pointer"
                                onClick={()=>nextPage()}
                                />
                        </div>
                        <div
                            className="w-5 h-5 cursor-pointer hover:text-blue-500"
                            onClick={()=>create()}
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
                            onClick={()=>view(data && data.uuid)}
                            >
                            <div
                                className={clsx([
                                    "transition duration-200 ease-in-out transform cursor-pointer inline-block sm:block border-b border-slate-200/60 dark:border-darkmode-400",
                                    "hover:scale-[1.02] hover:relative hover:z-20 hover:shadow-md hover:border-0 hover:rounded",
                                ])}
                            >
                            <div className="flex px-5 py-3">
                                <div className="flex items-center flex-none mr-5 w-48">
                                <div className='w-8'>
                                    {index+1+((page-1)*limit)}
                                </div>
                                <div
                                    className={clsx([
                                    "ml-3 truncate w-32"
                                    ])}
                                    >
                                    {data && data.display_code}
                                </div>
                                </div>
                                <div className="w-64 truncate sm:w-48">
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && dayjs(data.target_date).format('YYYY-MM-DD hh:mm:ss')}
                                    </span>
                                </div>
                                <div className="w-64 truncate sm:w-32" >
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && data.user && data.user.name}
                                    </span>
                                </div>
                                <div className="w-64 truncate sm:w-32" >
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && data.start_location}
                                    </span>
                                </div>
                                <div className="w-64 truncate sm:w-32" >
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && data.finish_location}
                                    </span>
                                </div>
                                <div
                                className={clsx([
                                    "pl-10 ml-auto whitespace-nowrap"
                                    ])}
                                    >
                                    {data && data.car_reservation_status && data.car_reservation_status.name}
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

export default tableTemplate3