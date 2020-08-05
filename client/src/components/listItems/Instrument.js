import React from 'react'

const Instrument = ({ id, year, brand, type, price }) => {
    return (
        <div style={{display: 'flex'}} key={id}>
            <p>Year: {year}</p>
            <p>Brand: {brand}</p>
            <p>Type: {type}</p>
            <p>Price: {price}</p>
            <p>Edit</p>
            <p>Remove</p>
        </div>
    )
}

export default Instrument
