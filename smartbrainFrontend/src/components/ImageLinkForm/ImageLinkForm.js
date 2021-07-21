import React from 'react'
import './ImageLinkForm.css'

export default function ImageLinkForm( { onInputChange, onButtonSubmit } ) {
    return (
        <div className="tc">
            <p className="f3 w-70 center">
                {'This Magic Brain will detect faces in your pictures, Give it a try'}
            </p>                           
            <div className="form w-70 center pa4 br3 shadow-4">
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    )
}
