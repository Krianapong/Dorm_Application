import React from "react"

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className='back'>
        <div className='container'>
          <h1>{name}</h1>
          <p>{title}</p>
        </div>
        <img src={cover} alt='' />
      </div>
    </>
  )
}

export default Back 