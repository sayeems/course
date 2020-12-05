import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ContentShimmer from '../skeleton/ContentShimmer';

function Content({ match }) {

    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState()

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true)
            const res = await axios.get(`http://localhost/courseContent/wp-json/sayeem/courses/contentList/${match.params.id}`)
            setContent(res.data)
            // setTimeout(() => {
            //     setLoading(false)
            // }, 5000)
            setLoading(false)
        }
        return fetchContent()

    }, [match.params.id]);
    return (
        <div className="theContent">
            {!loading && <div dangerouslySetInnerHTML={{ __html: content.content }}></div>}
            {loading && <ContentShimmer />}
        </div>
    )
}

export default Content
