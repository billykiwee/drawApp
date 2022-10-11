import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TitleHeader({title}) {


    const navigate = useNavigate()

    return (
        <div className='display'>
            <div className='display w-100 justify-s-b m-t-1'>

                <div className='grid'>
                    <div className='display'>
                        <button className='display w-2 h-2 hover border-r-100' onClick={e=> navigate(-1)}>
                            <span className='display'>
                                <svg width="22" height="22" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.7144 15.8018H7.21436" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.9644 24.5518L7.21436 15.8018L15.9644 7.05176" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </button>
                    </div>
                    <div>
                        <h2>{title}</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
