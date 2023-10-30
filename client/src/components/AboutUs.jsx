import React from 'react'
import {Header} from '../components'
import { aboutus, ap,full } from '../assets'

const AboutUs = () => {
  return (
            
<main className=" w-screen min-h-screen flex items-center justify-start flex-col home">
      <Header />
      <div class="container ">
      <div class="untoldcoding">
        <div class="img-container">
          <img src={ap} alt="" />
        </div>
        <div class="untoldcoding-details">
          <h2 >Wel-Come</h2>
          <p>
             Hey, I'm Biswajit <br /> Am a Full Stack Developer 👨🏻‍💻 , and I specialize in building efficient React, Node js, JS, CSS & HTML projects that just work across all platforms and browsers.
            <br />
            <br />
          
          </p>
        </div>
      </div>
      <div class="untoldcoding">
        <div class="img-container">
          <img src={full} alt="" />
        </div>
        <div class="untoldcoding-details">
          <h2>Food order and Hotel Booking App</h2>
          <p>
          A full-stack food ordering application would include both a front-end and a back-end component, as well as a database to store information about customers, orders, and restaurants.
            <br />
          </p>
        </div>
      </div>
    </div>

    </main>
  
  )
}

export default AboutUs