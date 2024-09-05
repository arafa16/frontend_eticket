import { dataUserTable } from '../../features/user/dataUserTable'

const viewDataUser = () => {
    const {table} = dataUserTable();

  return (
    <div className='w-full'>
        <div className='w-full mt-8'>
            {table}
        </div>
    </div>
  )
}

export default viewDataUser