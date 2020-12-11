import React from 'react'
import roles from './roles.js'

export default function Card({ 
    card: {
        role, 
        id,
    },
    index,
    facedown, 
    wiggle,
    onClick = () => {},
 }) {
    const { number, material } = roles[role] || {};

    const style = {
        top: `${index + 1}px`,
        left: `${index + 1}px`,
      }

    return (
        <div
            onClick={() => onClick({ role, id })}
            className={`${facedown ? 'facedown' : role} card ${wiggle ? 'wiggle' : ''}`} 
            style={style}>
            {
                facedown || <>
                    <div className="role">
                        {role}
                    </div> 
   
                    <div className="material">
                        {material}
                    </div>          
                    <div className="number">
                        {number}
                    </div> 
                </>         
            }
        </div>
    )
}
