import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'

function Sort() {
    const {sort, setSort} = useContext(UserContext)

    const onSelectChange = ({currentTarget: input}) => {
        setSort({sort: input.value, order: sort.order});
    }

    const onArrowChange = () => {
        if(sort.order === 'asc') {
            setSort({sort: sort.sort, order: 'desc'});
        }else {
            setSort({sort: sort.sort, order: 'asc'});
        }
    }
  return (
    <div style={{display: 'flex', width: '250px'}} className='m-2'>
        <p className='m-2'>Sort by:</p>
        <select
            className="form-select" 
            onChange={onSelectChange}
            defaultValue={sort.sort}
        >
        <option value="_id">ID</option>
        <option value="username">Username</option>
        <option value="phoneNumber">Phone number</option>
        <option value="zipCode">Zip Code</option>
        </select>
        <button className="btn btn-outline-dark" onClick={onArrowChange}>
            {sort.order === 'asc' ? <p>&uarr;</p>
            : <p>&darr;</p>}
        </button>
    </div>
  )
}

export default Sort