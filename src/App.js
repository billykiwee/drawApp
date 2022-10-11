import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Camera from './Camera'
import MediaDowload from './Media'


export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/camera" exact element={<Camera />} />
                <Route path="/media/:videoID" exact element={<MediaDowload />} />
            </Routes>
        </BrowserRouter>
    )
}