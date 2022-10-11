import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'




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
        const cameraView    = document.querySelector("#camera--view")
        
        navigator.mediaDevices
        .getUserMedia(constraints)
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
    const [Zoom, setZoom] = useState(88)
    const widthMin = 50

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
/* 
    useEffect(e=> {
        DragImage(document.getElementById('Drag_Image'), 'reset')    
    }, [LoadImag]) */




    return (
        <main id="camera" >

            <div className="grid h-100vh overflow-hidden">

                <div className="grid justify-c">

                    <div className="w-100 h-100 grid absolute overflow-hidden zi-2">

                        {
                            LoadImag&&
                            <div className='display justify-c w-100 gap zi-2' style={{height: '10vh'}} >
                                <ButtonControl onClick={e=> setZoom(Zoom >= widthMin ? Zoom -10 : Zoom)} >
                                    <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" /></svg>
                                </ButtonControl>
                                <ButtonControl onClick={e=> setZoom(Zoom +10)}>
                                    <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                                </ButtonControl>
                            </div>
                        }

                        <div className='display justify-c' style={{height: '80vh'}}>
                            <Draggable>
                                <div className='display justify-c w-88 absolute' >
                                    <Image 
                                        src={LoadImag} 
                                        Opacity={Opacity} 
                                        Position={Position} 
                                        Zoom={Zoom} 
                                    />
                                </div>
                            </Draggable>
                        </div>

                        <div className='display justify-c w-100 gap zi-2 bottom-0 fixed' style={{height: '10vh'}}>
                            <ButtonControl >
                                <label htmlFor='upload'>
                                    <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" /></svg>
                                    <input onChange={e=> previewFile(e)} type='file' accept="image/png, image/jpeg"  className='no-click' hidden id='upload' />
                                </label>
                            </ButtonControl>
                            <ButtonControl onClick={e=> setPosition(Position -90)} >
                                <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
                            </ButtonControl>
                            <ButtonControl >
                                <svg width={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">  <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                            </ButtonControl>
                            <div className='grid'>
                                <label>Opacity</label>
                                <input type='range' className='h-1' max={100} onChange={e=> setOpacity(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* <canvas id="camera--sensor" className="absolute h-100"></canvas> */}
                    <video controls={false} id="camera--view" autoPlay playsInline className='w-100 h-100vh fit-cover' /> 
                </div>

            </div>
        </main>
    )
}



function Image({src, Opacity, Position, Zoom}) {

    if (src)
    return (
        <img 
            style={{
                opacity: Opacity / 100,
                transform: `rotate(${Position}deg)`,
                width: `${Zoom}%`
            }} 
            src={src} 
            className="click w-100 transition" 
        />
    )
}


function ButtonControl({children, onClick}) {

    return (
        <div className='display'>
            <button type='button' className='click grey h-3 w-3 hover-white' onClick={onClick}>
                <span className='display'>
                    {children}
                </span>
            </button>
        </div>
    )
}

