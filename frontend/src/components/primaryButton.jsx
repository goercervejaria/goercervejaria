import React from 'react'

function PrimaryButton({text, onClick}) {
  return (
    <div className='btn text-mono' onClick={onClick} style={{cursor:"pointer"}}>{text}</div>
  )
}

export default PrimaryButton