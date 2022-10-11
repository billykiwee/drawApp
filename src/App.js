import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Camera from './Camera'



export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/camera" exact element={<Camera />} />
            </Routes>
        </BrowserRouter>
    )
}