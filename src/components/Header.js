import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Menu from './Menu'


export default function Header({name, link, logo, ShopID}) {

    const navigate = useNavigate()

    const [ShowMenu, setShowMenu] = useState(false)

    useEffect(e=> {
        document.querySelectorAll('#menu-link').forEach(e=> {
            e.onclick = () => setShowMenu(false)
        })
    })

    return (
        <>
            <header className='display fixed h-4 white shadow w-100' style={{top: 0, zIndex: 10}}>
                <div className='display justify-s-b w-88 m-auto'>

                    <div className='display'>

                        <div className='display'>
                            <Link to={link ?? '/'} className='display' onClick={e=> setShowMenu(false)} >
                                <img src={logo ?? '/images/logo.png'} className='border-r-100' width={40} height={40} />
                                {
                                    name &&
                                    <span className='f-s-20 f-w-500 m-l-04'>{name}</span>
                                }
                            </Link>
                        </div>
                    </div>

                    <button className='display justify-c click hover w-3 h-3 border-r-100' onClick={e=> setShowMenu(ShowMenu === false ? true : false)}>
                        <span className='display'>
                            <img src='/images/hamburger.svg' width={24} />
                        </span>
                    </button>
                </div>
            </header>

            <Menu on={ShowMenu} ShopID={ShopID} />
        </>
    )
}
