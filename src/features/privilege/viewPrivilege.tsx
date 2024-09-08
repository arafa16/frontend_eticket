import React from 'react'

const viewPrivilege = (props:any) => {
    const {data} = props;

    return (
        <div className="w-full box p-8">
            <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 '>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        dashboard
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                        {data && data.dashboard ? 'on' : 'off'}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        ticket requestor
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.ticket_requestor ? 'on' : 'off'}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        ticket executor
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.ticket_executor ? 'on' : 'off'}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        entity
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.entity ? 'on' : 'off'}
                    </div>
                </div>
                <div>
                    <div className="font-medium whitespace-nowrap">
                        admin
                    </div>
                    <div className="mt-1  text-slate-500">
                        {data && data.admin ? 'on' : 'off'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default viewPrivilege