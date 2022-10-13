import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder"
import MediaDowload from './Media'



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
    let widthMin = 20, widthStep = 20

    const [Lock, setLock] = useState(false)


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
    



    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ 
            video: true, 
            facingMode:{exact: "environment"}  ,
            audio: true, blobPropertyBag: {
                type: "video/mp4"
            }
        });
    
    return (
        <div>
        <p>{status}</p>
        <button className='red' onClick={startRecording}>Start Recording</button>
        <button className='blue' onClick={stopRecording}>Stop Recording</button>
        <video src={mediaBlobUrl} controls autoPlay />
        </div>
    );


    /* return (
        <main id="camera" >

            <div className="grid h-100vh overflow-hidden">

                <div className="display justify-c">
                    <ReactMediaRecorder
                        video={true}
                        videorecorder
                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {


                            if (mediaBlobUrl)  {
                                console.log(mediaBlobUrl);
                                return <MediaDowload videoURL={mediaBlobUrl} />
                            }

                            return (
                                <>
                                    <div className="w-100 h-100 grid absolute overflow-hidden zi-2">

                                        {
                                            LoadImag&&
                                            <div className='display justify-c w-100 gap zi-2' style={{height: '10vh'}} >

                                                <div className='display white border-r-04' style={{opacity : Lock && 0.4}}>
                                                    <ButtonControl onClick={e=> !Lock && setPosition(Position -90)}  className={Lock && 'opacity'}>
                                                        <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
                                                    </ButtonControl>
                                                    <ButtonControl onClick={e=> !Lock && setZoom(Zoom !== widthMin ? Zoom - widthStep : Zoom)} >
                                                        <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" /></svg>
                                                    </ButtonControl>
                                                    <ButtonControl onClick={e=> !Lock && setZoom(Zoom +widthStep)}>
                                                        <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--black)">  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                                                    </ButtonControl>
                                                </div>
                                                <button className={(Lock ? 'red' : 'white') + ' display w-3 h-3'} onClick={e=> setLock(Lock === false ? true : false)}>
                                                    <span className='display p-04'>
                                                        {
                                                            Lock
                                                            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={22}> <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" /></svg>
                                                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={22}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg> 
                                                        }
                                                    </span>
                                                </button>
                                            </div>
                                        }

                                        <div className='display justify-c select_none' style={{height: '80vh'}}>
                                            <Draggable disabled={Lock ? true : false}>
                                                <div className='display justify-c w-88 absolute h-100' >
                                                    <Image 
                                                        Zoom={Zoom}
                                                        src={LoadImag} 
                                                        Opacity={Opacity} 
                                                        Position={Position} 
                                                    />
                                                </div>
                                            </Draggable>
                                        </div>

                                        <div className='display justify-c w-100 gap zi-2 bottom-0 fixed' style={{height: '10vh', pointerEvents : Lock && 'none', opacity: Lock&& 0.4}}>
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
                                            <div className='display justify-c white h-3 border-r-04 p-lr-04'>
                                                <input type='range' className='h-1' max={100} onChange={e=> setOpacity(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <video controls={false} src={mediaBlobUrl} playsInline autoPlay className='transition w-100 h-100vh fit-cover' /> 
                                    <video controls={false} playsInline id="camera--view" autoPlay className='transition w-100 h-100vh fit-cover' /> 
                                </>
                            )
                        }}
                    />
                </div>
            </div>
        </main>
    ) */
}



function Image({src, Opacity, Position, Zoom, TypeZoom}) {

    if (src)
    return (
        <img 
            style={{
                opacity: Opacity / 100,
                transform: `rotate(${Position}deg) scale(${Zoom/100})`
            }} 
            src={src} 
            className="click w-100 transition" 
        />
    )
}


function ButtonControl({children, onClick, className}) {

    return (
        <div className='display'>
            <button type='button' className={'click white h-3 w-3 hover-white shadow ' + className} onClick={onClick}>
                <span className='display'>
                    {children}
                </span>
            </button>
        </div>
    )
}
