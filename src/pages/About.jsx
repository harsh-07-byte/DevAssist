import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from "../Components/core/AboutPage/Quote"
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../Components/core/AboutPage/Stats'
import LearningGrid from '../Components/core/AboutPage/LearningGrid'
import ContactFormSection from '../Components/core/AboutPage/ContactFormSection'
import Footer from '../Components/common/Footer'
import RatingSlider from '../Components/core/Ratings/RatingSlider';

const About = () => {
  return (
    <div className='mx-auto text-white'>
      <section className='bg-richblack-700'>
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white'>
            <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
               Pioneering Next‑Gen E‑Learning for 
                <HighlightText text={"Tomorrow's success"}/>
                <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>Empowering learners everywhere, DevAssist blends next‑generation tools, dynamic courses, and a collaborative spirit to shape tomorrow’s brightest innovators</p>
            </header>
            <div className='sm:h-[70px] lg:h-[150px]'></div>
            <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                <img src={BannerImage1} />
                <img src={BannerImage2} />
                <img src={BannerImage3} />
            </div>
        </div>
      </section>


      <section className='border-b border-richblack-700'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
          <div className='h-[100px] '></div>
            <Quote/>
        </div>
      </section>



      <section>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            <div className='flex flex-col items-center gap-10 lg:flex-row justify-between '>
                <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                    <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>Our Founding Story</h1>

                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Born from the shared ambition of teachers, tech enthusiasts, and lifelong learners, our platform emerged to break down barriers in education. United by a belief that everyone deserves engaging, top-tier learning—anytime, anywhere—we combined cutting-edge technology with the insights of seasoned educators to craft a space where curiosity thrives and knowledge flows freely.</p>

                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Having navigated the hurdles of conventional schooling ourselves, we realized learning shouldn’t be boxed into classrooms or limited by location. That’s why we built a dynamic platform—one that tears down walls, unites learners everywhere, and helps everyone discover and develop their very best selves.</p>
                </div>
                <div>
                    <img className='shadow-[0_0_20px_0] shadow-[#FC6767]'  src={FoundingStory} />
                </div>
            </div>

            <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                    <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>Our Vision</h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Inspired to elevate learning to new heights, we built an e‑learning platform where innovation meets inspiration. Every feature is designed by experts and every lesson is crafted to spark curiosity, ensuring learners stay motivated and empowered at every step.</p>
                </div>

                <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                    <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] '>
                        Our Mission
                    </h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>We’re more than just an online course platform—we’re a thriving learning hub where curious minds come together to share, discuss, and grow. By blending interactive forums, live workshops, and networking events, we cultivate a collaborative atmosphere where ideas spark, connections flourish, and knowledge truly comes to life.
</p>
                </div>
            </div>
        </div>
      </section>  

      <StatsComponent/>  
      
      <section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <LearningGrid />
        <ContactFormSection />
      </section>

      <section>
      <div className=' mb-16 mt-3 w-screen'>
        <h2 className='text-center text-4xl font-semibold mt-8 text-richblack-5 mb-5'>Reviews about our courses from students who have taken them</h2>
        <RatingSlider />
      </div>
      </section>

    </div>
  )
}

export default About
