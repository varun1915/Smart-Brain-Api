import React from 'react'
import Particles from 'react-particles-js';

const particleOptions = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 700
            }
        }
    }
}

export default function Background() {
    return (
        <div>
            <Particles className="particles"
                params={particleOptions}
            />
        </div>
    )
}
