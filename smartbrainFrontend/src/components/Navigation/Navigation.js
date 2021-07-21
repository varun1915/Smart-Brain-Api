import React from 'react'
import './Navigation.css'

export default function Navigation(props) {
    if(props.signedIn)
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={ () => props.onRouteChange('signout')} className='navigation f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    else
        return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={ () => props.onRouteChange('signin')} className='navigation f3 link dim black underline pa3 pointer '>Sign In</p>
                </nav>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={ () => props.onRouteChange('register')} className='navigation f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            </div>
        )
}
