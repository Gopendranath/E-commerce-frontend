import React from 'react'
import { useParams } from 'react-router-dom'

const Selectedfeature = () => {
  const {id} = useParams()
  return (
    <div>Selectedfeature</div>
  )
}

export default Selectedfeature