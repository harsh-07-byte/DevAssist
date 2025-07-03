
import React from "react"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import Banner from "../assets/Images/banner.mp4"
import Footer from "../components/common/Footer"

import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import { useEffect, useState } from "react"
function Home() {
  

  return (

    <div>
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">

        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>




        <div className="text-center text-4xl font-semibold mt-7">
          Shape Your Tomorrow with
          <HighlightText text={"The Power Of Code"} />
        </div>



        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
        Our online coding courses let you learn whenever and wherever it suits you,
        with access to rich learning materials like interactive projects, quizzes,
        and personalized guidance from experienced instructors.
        </div>




        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>




        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div> 




        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Sharpen Your
                <HighlightText text={"Coding Edge"} /> with our flexible
                online learning
              </div>
            }
            subheading={
              "Each of our courses is crafted and led by seasoned professionals with extensive coding experience and a passion for teaching."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`</head>
<body>
  <header>
    <h1>My Awesome Website</h1>
  </header>

  <main>
    <h2>Hello, World!</h2>
    <p>Welcome to my website. This is a sample HTML page.</p>
    <p>Learn more on <a href="https://www.w3schools.com" target="_blank">W3Schools</a>.</p>
  </main>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>




        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Jump right in—our interactive learning platform lets you start coding real projects from day one."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>




      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">




          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">


          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Learn the skills that open doors to {" "}
              <HighlightText text={"Top Job Opportunities"} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                Todays DevAssist sets its own standards, and excelling as a specialist demands far more than just professional expertise
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>




          <TimelineSection />





          <LearningLanguageSection />
        </div>
      </div>




      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">


        <InstructorSection />



        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews given by Students who have taken different courses
        </h1>

        {/* Reviews remaninig to implement */}

      </div>



      <Footer />

   
    </div>
  )
}

export default Home
