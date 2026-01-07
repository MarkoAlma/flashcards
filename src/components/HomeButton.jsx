import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const HomeButton = () => {

    const navigate = useNavigate()

  return (
    <div className='glass-btnka haza' onClick={()=>navigate("/")}>
        <FaHome fill='white'/>
    </div>
  )
}

export default HomeButton
