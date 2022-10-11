import React, { useState } from 'react'

export default function NoData() {

    var emojis = '🍗 🍟 🍕 🌮 🧆 🍔 🥩 🥓 🍳 🥐 🥝 🍅 🍑 🥑 🍉 🍤 🍣 🍜 🍫 🍩 🍪 🍰 🍦 🍷 🥂 🍻 🍾 🍽 🍺 🍸 🥗 🥙 🥖 🍞 🧇 🧀'



    const [emo, setEmo] = useState('')
    function emoji(){
        return emojis.split(' ')[Math.floor(Math.random() * emojis.split(' ').length)]
    }


    return (

        <div className='display justify-c p-1 f-s-16 '>
            <div className='grid'>
                <div className='display justify-c'>          
                    <button className='grey border-r-1 border' style={{width: '5rem', height: '5rem', borderRadius: '100%'}} onClick={e=> setEmo(emoji())}>
                        <span style={{fontSize: '2rem', margin : 0}}> {emo ? emo : '👻'}</span>
                    </button>
                </div>
                <div className='display m-t-04'>
                    <span>Il n'y a rien ici pour le moment</span>
                </div>
            </div>
        </div>
    )
}
