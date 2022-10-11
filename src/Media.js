import React from 'react'


export default function MediaDowload({videoURL}) {
    
    return (
        <div className='display grid'>
            <div className='grid border-1 white p-1' >
                <div>
                    <span>Télécharger la video</span>
                </div>
                <div className='display'>
                    <video src={videoURL} id="camera--view" download={videoURL} controls={true} autoPlay playsInline className='transition w-100 fit-cover' /> 
                </div>
                <a href={videoURL} download>rere</a>
            </div>
        </div>
    )
}

