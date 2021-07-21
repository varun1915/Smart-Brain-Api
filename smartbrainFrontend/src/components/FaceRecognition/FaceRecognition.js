import React from 'react'
import './FaceRecognition.css'

export default function FaceRecognition( { imageURL, boxes } ) {
    return (
        <div className='tc'>
            <img id="inputImage" className="pt3" src={imageURL} alt="" width='500px' height="auto"/>
            
            {boxes.map(box => (
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                ></div>
            ))}
            
        </div>
    )
}
