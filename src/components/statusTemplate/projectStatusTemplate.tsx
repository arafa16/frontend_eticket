import React from 'react'

const projectStatusTeplate = (props:any) => {
  const {datas, project, clickStatus} = props;

  return (
    <div>
      <div className="md:flex md:justify-end text-xs box z-20">
          {datas && datas.rows && datas.rows.map((data :any, index:any)=>(
              <div 
                  key={index} 
                  className={`${data.id === project.project_status_id ? 'bg-slate-0 text-slate-600' : 'bg-slate-100 text-slate-300'} capitalize px-4 py-1 intro-x dark:bg-darkmode-600 hover:cursor-pointer`}
                  onClick={()=>clickStatus({
                    status:data,
                    project:project
                  })}
                  >
                  {data.name}
              </div>
          ))}
      </div>
    </div>
  )
}

export default projectStatusTeplate