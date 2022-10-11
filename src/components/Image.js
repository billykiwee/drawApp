import React from 'react'


export default function Image({src, svg, dimension, className}) {


    return (
        <div className='display'>
            {
                svg ? <span style={{width: dimension + 'px', height: dimension + 'px', borderRadius: dimension + 'px'}}> {svg} </span>
                : 
                <img alt='' src={src} 
                    className={className}
                    style={{
                        width: dimension + 'px', 
                        height: dimension + 'px', 
                        borderRadius: dimension + 'px'
                    }}
                />
            }
        </div>
    
    )
}
