import React from 'react'
import './Skeleton.css'

function SkeletonElement({ type }) {
    const elementClasses = `skeleton ${type}`
    return (
        <div className={elementClasses}>

        </div>
    )
}

export default SkeletonElement
