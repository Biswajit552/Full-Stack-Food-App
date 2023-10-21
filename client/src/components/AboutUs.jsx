import React from 'react'
import {Header} from '../components'
import { aboutus, ap } from '../assets'

const AboutUs = () => {
  return (
    <div >
        <Header/>
        <div className=' w-screen h-screen overflow-hidden'>
            <img src={aboutus} alt="" className=" w-full h-fullobject-cover" />
            <img src={ap} alt="" className=' w-[260px] rounded-full    mt-[-850px] ml-8' />
                <h1>Hii, Am Biswajit</h1>
        </div>

    </div>
  )
}

export default AboutUs