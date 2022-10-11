import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { ReactMediaRecorder } from "react-media-recorder"



export default function Camera() {

    // Set constraints for the video stream
    var constraints = { 
        video: { 
            facingMode: "environment" 
        },
        audio: false 
    }

    // Access the device camera and stream to cameraView
    function cameraStart() {

        // Define constants
        const cameraView = document.querySelector("#camera--view")
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            cameraView.srcObject = stream
        })
        .catch(error => {
            console.error(error)
        })
    }

    useEffect(e=> {
        cameraStart()        
    }, [window])



    const [Opacity, setOpacity] = useState(70)
    const [Position, setPosition] = useState(0)

    const [TypeZoom, setTypeZoom] = useState('screen')
    const [Zoom, setZoom] = useState(100)
    let widthMin = 100, widthStep = 20

    useEffect(e=> {
        setZoom(100)
    }, [TypeZoom])

    useEffect(e=> {
        if (TypeZoom === 'img') widthMin = 40
    })


    const [LoadImag, setLoadImg] = useState('')

    function previewFile() {

        const file = document.querySelector('input[type=file]').files[0]
        const reader = new FileReader()

        if (file) PreviewImg()

        function PreviewImg() {
            reader.addEventListener("load", (e) => setLoadImg(reader.result))
            reader.readAsDataURL(file)
        }

    }
    
    const [VideoRecorded, setVideoRecorded] = useState('')
    
    

    if (VideoRecorded) return <MediaRecordedPop mediaBlobUrl={VideoRecorded} />
    return (
        <main id="camera" >

            <div className="grid h-100vh overflow-hidden">

                <div className="display justify-c">
                    <ReactMediaRecorder
                        video
                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {

                            setVideoRecorded(mediaBlobUrl)
                            return (
                                <>
                                    <div className="w-100 h-100 grid absolute overflow-hidden zi-2">

                                        {
                                            LoadImag&&
                                            <div className='display justify-c w-100 gap zi-2' style={{height: '10vh'}} >

                                                {
                                                    TypeZoom === 'img' &&
                                                    <ButtonControl onClick={e=> setPosition(Position -90)} >
                                                        <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
                                                    </ButtonControl>
                                                }

                                                <div className='display white border-r-04'>
                                                    <ButtonControl onClick={e=> setZoom(Zoom !== widthMin ? Zoom - widthStep : Zoom)} >
                                                        <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" /></svg>
                                                    </ButtonControl>
                                                    <ButtonControl onClick={e=> setZoom(Zoom +widthStep)}>
                                                        <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)">  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                                                    </ButtonControl>
                                                    <button className='display w-2' onClick={e=> setTypeZoom(TypeZoom === 'screen' ? 'img' : 'screen')}>
                                                        <span className='display p-04'>
                                                            {
                                                                TypeZoom === 'screen' 
                                                                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--blue)" className="w-1"><path fillRule="evenodd" d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z" clipRule="evenodd" /></svg>
                                                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                                                            }
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        }

                                        <div className='display justify-c select_none' style={{height: '80vh'}}>
                                            <Draggable>
                                                <div className='display justify-c w-88 absolute h-100' >
                                                    <Image 
                                                        Zoom={Zoom} TypeZoom={TypeZoom}
                                                        src={LoadImag} 
                                                        Opacity={Opacity} 
                                                        Position={Position} 
                                                    />
                                                </div>
                                            </Draggable>
                                        </div>

                                        <div className='display justify-c w-100 gap zi-2 bottom-0 fixed' style={{height: '10vh'}}>
                                            <ButtonControl >
                                                <label htmlFor='upload'>
                                                    <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" /></svg>
                                                    <input onChange={e=> previewFile(e)} type='file' accept="image/png, image/jpeg"  className='no-click' hidden id='upload' />
                                                </label>
                                            </ButtonControl>
                                            <ButtonControl onClick={status === 'recording' ? stopRecording : startRecording}>
                                                <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)">  <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                                                {
                                                    status === 'recording' &&
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="#EB3B5A"/></svg>
                                                }
                                            </ButtonControl>
                                            <div className='grid white h-3 border-r-04 p-lr-04'>
                                                <label>Opacity</label>
                                                <input type='range' className='h-1' max={100} onChange={e=> setOpacity(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <video style={{transform: `scale(${TypeZoom === 'screen' && Zoom/100})`}}  controls={false} id="camera--view" autoPlay playsInline className='transition w-100 h-100vh fit-cover' /> 
                                </>
                            )
                        }}
                    />
                </div>
            </div>
        </main>
    )
}



function Image({src, Opacity, Position, Zoom, TypeZoom}) {

    if (src)
    return (
        <img 
            style={{
                opacity: Opacity / 100,
                transform: `rotate(${Position}deg) scale(${TypeZoom === 'img' && Zoom/100})`
            }} 
            src={src} 
            className="click w-100 transition" 
        />
    )
}


function ButtonControl({children, onClick}) {

    return (
        <div className='display'>
            <button type='button' className='click white h-3 w-3 hover-white shadow' onClick={onClick}>
                <span className='display'>
                    {children}
                </span>
            </button>
        </div>
    )
}



function MediaRecordedPop({mediaBlobUrl}) {
    return (
        <div className='display grid'>
            <div className='grid border-1 white p-1' >
                <div>
                    <span>Télécharger la video</span>
                </div>
                <div className='display'>
                    <video src={mediaBlobUrl} id="camera--view" download={mediaBlobUrl} controls={true} autoPlay playsInline className='transition w-100 fit-cover' /> 
                </div>
                <a href={mediaBlobUrl} download>rere</a>
            </div>
        </div>
    )
}



