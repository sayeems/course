import React from 'react'

function TestChield({ match }) {
    console.log(match)
    return (
        <div>
            <h1>You are in {match.params.id}</h1>
        </div>
    )
}

export default TestChield
