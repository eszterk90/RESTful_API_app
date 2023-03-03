import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'

function Pagination() {
  const {total, limit, setPage} = useContext(UserContext);
  const totalPages = Math.ceil(total / limit);
  
  const onClick = (newPage) => {
    setPage(newPage +1);
  }

  return (
    <div>
    {totalPages > 0 && [...Array(totalPages)].map((value, index) => (
      <button className="btn btn-outline-dark m-1" key={index} onClick={() => onClick(index)}>
        {index + 1}
      </button>))}
    </div>
  )
}

export default Pagination