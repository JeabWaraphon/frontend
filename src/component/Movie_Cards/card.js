import React from 'react'

export const Cards = ({ index, title, image }) => {
    return (
        <div
            key={index}
            style={{
                cursor: 'pointer',
                margin: '3%',
                border: '1px solid lightgray'
            }}>
            <div onClick={() => alert(title)}>
                {title}
            </div>
            <div>
                <img onClick={() => window.open(image)} src={image} height="200px" />
            </div>
        </div>
    )
}