import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from './Container'
import { useStateValue } from './StateProvider'


export default function Menu({on, ShopID}) {

    const [{user}] = useStateValue()
    
    if (on)
    return (

        <div className='fixed white w-100 h-100 m-t-0' style={{zIndex : 12}}>
            <Container style='m-t-2'>
                <div className='grid'>
                    <ul className='grid'>
                        <ListMenu icon='home' txt='Home' link='/' click={e=> on = false}/>
                        <ListMenu icon='pricing' txt='Tarifs' link='/pricing' click={e=> on = false}/>
                        <ListMenu icon='shop' txt='Shop' link='shop' click={e=> on = false}/>
                        <ListMenu icon='login' txt='Connexion' link='login' click={e=> on = false}/>
                    </ul>

                    <div className='display m-t-2' >
                        <a href={user ? `/${ShopID}/dashboard` : 'signup'} className='w-100' >
                            <button className='h-4 blue border-r-1'>
                                {
                                    user 
                                    ? <span className='display f-s-20'>Aller au dashboard</span>
                                    : <span className='display f-s-20'>Créer un compte</span>
                                }
                            </button>
                        </a>
                    </div>
                </div>
            </Container>            
        </div>
    )
}


function ListMenu({icon, txt, link, click}) {
    return (
        <li className='grid hover border-r-1 p-1 click' id='menu-link' onClick={click}>
            <Link to={link} className='display'>
                <div className='display'>
                    <span className='display m-r-1'>
                        <img src={'/images/'+ icon + '.svg'} width={30} height={30} />
                    </span>
                    <span className='f-s-20 f-w-500'>{txt}</span>
                </div>
            </Link>
        </li>
    )
}