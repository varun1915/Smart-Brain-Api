import React from 'react'

export default function Rank(props) {
    return (
        <div className="tc">
            <div className="white f3">
                {`${props.name}, your current Entry Count is ... `}
            </div>
            <div className="white f1">
                {props.entries}
            </div>
        </div>
    )
}
