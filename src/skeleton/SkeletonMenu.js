import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

function SkeletonMenu({ theme }) {
    const articleTheme = theme || `light`
    return (
        <div className={`skeleton-menu-wrapper ${articleTheme}`}>
            <div className="skeleton-menu">
                <Shimmer />
            </div>
        </div>
    )
}

export default SkeletonMenu
