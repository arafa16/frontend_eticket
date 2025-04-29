import dayjs from 'dayjs'

const viewProject = (props:any) => {
    const {datas} = props;

    return (
        <div className="w-full box text-xs p-4">
            <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10'>
                <div>
                    <div className="mt-1 font-medium underline text-slate-700">
                        {datas && datas.display_code}
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 mt-10 border-b border-slate-200/60 dark:border-darkmode-400 pb-10'>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Name
                    </div>
                    <div className="mt-1 text-slate-500 text-justify">
                        {datas && datas.name}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Description
                    </div>
                    <div className="mt-1 text-slate-500 text-justify">
                        {datas && datas.description}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Create Date
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dayjs(datas && datas.date).format('YYYY-MM-DD') }
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        Target Date
                    </div>
                    <div className="mt-1 text-slate-500">
                        {dayjs(datas && datas.target_date).format('YYYY-MM-DD') }
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        PIC
                    </div>
                    <div className="mt-1 text-slate-500 text-justify">
                        {datas && datas.executor_id !== null ? datas.executor && datas.executor.name : 'waiting response'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default viewProject