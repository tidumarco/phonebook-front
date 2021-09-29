import React from 'react'

const Name = ({ name, number, deleteEntry }) => {
    
    return (
        <div>
            <li className="name">{name} {number}
            <button 
            onClick={() => {
                
                const confirmBox = window.confirm(
                    "Delete entry?"
                )
                if (confirmBox === true) {
                    deleteEntry()
                }
            }}>Delete</button>
            
            </li>
        </div>
         
         
    )
}

export default Name