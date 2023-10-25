import React from 'react'
import { DBLeftHotel, DBRightHotel } from '../components'

const DashboardHotel = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
        <DBLeftHotel/>
        <DBRightHotel/>

    </div>
  )
}

export default DashboardHotel