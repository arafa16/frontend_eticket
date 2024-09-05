import React from 'react'
import { FormInput } from '../../base-components/Form'
import Lucide from '../../base-components/Lucide';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const tableTemplate1 = (props:any) => {
    const {
        search, setSearch,
        datas,
        limit, setLimit,
        page, setPage,
        allPage, setAllPage,
        prevPage, nextPage,
    } = props;

    console.log(datas, 'datas')

    const navigate = useNavigate();
    return (
        <div>
            <div className="box w-full">
                <div className="flex flex-col-reverse px-5 py-4 border-b sm:flex-row text-slate-500 border-slate-200/60">
                    <div className='flex items-center mx-4'>
                    <FormInput
                        type="text"
                        className="block px-3 py-1 mt-0 mx-2 text-xs"
                        placeholder="search by name"
                        name='search'
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    </div>
                    <div className="flex items-center justify-end sm:ml-auto">
                        <div className='flex items-center mx-4'>
                            <FormInput
                                type="text"
                                className="block px-1 py-0 mt-0 w-10 mx-2 text-center text-xs"
                                placeholder="0"
                                name='limit'
                                value={datas && datas.count === 0 ? 0 : (datas !== undefined ? (limit > datas.count ? datas.count : limit) : '')}
                                onChange={(e:any)=>setLimit(e.target.value)}
                            /> 
                            <p className=' text-center text-xs'>/ {datas && datas.count}</p>
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
                            onClick={()=>navigate('/user/create')}
                            >
                            <Lucide icon="FilePlus" className="w-4 h-4" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto sm:overflow-x-visible text-xs">
                    {datas && datas.rows && datas.rows.map((data : any, index : any) => (
                        <div 
                            key={index} 
                            className="intro-y"
                            onClick={()=>navigate(`/user/data/${data.uuid}`)}
                            >
                            <div
                                className={clsx([
                                    "transition duration-200 ease-in-out transform cursor-pointer inline-block sm:block border-b border-slate-200/60 dark:border-darkmode-400",
                                    "hover:scale-[1.02] hover:relative hover:z-20 hover:shadow-md hover:border-0 hover:rounded",
                                ])}
                            >
                            <div className="flex px-5 py-3">
                                <div className="flex items-center flex-none mr-5 w-72">
                                <div className='w-16'>
                                    {index+1+((page-1)*limit)}
                                </div>
                                <div
                                    className={clsx([
                                    "ml-3 truncate"
                                    ])}
                                    >
                                    {data && data.name}
                                </div>
                                </div>
                                <div className="w-64 truncate sm:w-64">
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && data.sequence}
                                    </span>
                                </div>
                                <div className="w-64 truncate sm:w-64">
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && data.is_select ? 'select' : 'not select'}
                                    </span>
                                </div>
                                <div className="w-64 truncate sm:w-64">
                                    <span
                                        className={clsx([
                                        "ml-3 truncate"
                                        ])}
                                        >
                                        {data && data.is_active ? 'active' : 'not active'}
                                    </span>
                                </div>
                                <div
                                className={clsx([
                                    "pl-10 ml-auto whitespace-nowrap"
                                ])}
                                >
                                    {data && data.is_delete ? 'deleted' : 'not deleted'}
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

export default tableTemplate1