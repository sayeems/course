import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

function SkeletonArticle({ theme }) {
    const articleTheme = theme || `light`
    return (
        <div className={`skeleton-wrapper ${articleTheme}`}>
            <div className="skeleton-article">
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
                <Shimmer />
            </div>
        </div>
    )
}

export default SkeletonArticle
