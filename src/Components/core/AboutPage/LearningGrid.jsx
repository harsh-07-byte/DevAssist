import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../../core/HomePage/Button";

const LearningGridArray = [
    {
      order: -1,
      heading: "Global‑Standard Learning",
      highlightText: "At Your Fingertips",
      description:
        "Through alliances with over more than 100 renowned universities and companies, DevAssist offers cost‑effective, on‑demand programs that bridge the gap between education and employment.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Real‑World Skillsets, Professionally Curate",
      description:
        "Learn smarter, not harder: our program is designed for today’s job market—and your wallet.",
    },
    {
      order: 2,
      heading: "The Way We Grow Your Skills",
      description:
        "Through our network of more than 100 university and corporate partners, DevAssist offers best teachers",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Through our network of more than 100 university and corporate partners, DevAssist offers best teachers",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Through our network of more than 100 university and corporate partners, DevAssist offers best teachers",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Through our network of more than 100 university and corporate partners, DevAssist offers best teachers",
    },
  ];


const LearningGrid = () => {
  return (
    <div className='grid  grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
    {
        LearningGridArray.map( (card, index) => {
            return (
                <div
                key={index}
                className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"}
                ${
                    card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                }
                ${card.order === 3 && "lg:col-start-2"}
                ${card.order < 0 && "bg-transparent"}
                `}
                >
                {
                    card.order < 0 
                    ? (
                        <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                            <div className='text-4xl font-semibold'>
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className='font-medium'>
                                {card.description}
                            </p>
                            <div className='w-fit mt-4'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    )
                    : (<div className='flex flex-col gap-8 p-7'>
                        <h1 className='text-richblack-5 text-lg'>
                            {card.heading}
                        </h1>
                        <p className='text-richblack-300 font-medium'>
                            {card.description}
                        </p>
                    </div>)
                }

                </div>
            )
        } )
    } 
    </div>
  )
}

export default LearningGrid
