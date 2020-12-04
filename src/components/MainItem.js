import React, { useState } from 'react'
import SubItem from './SubItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter, faGithub, faHtml5, faCss3 } from '@fortawesome/free-brands-svg-icons'
import { FaHtml5, FaCss3 } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

// function MainItem({ children, name, total, data }) {
function MainItem({
    name,
    iconName,
    contentCount,
    id,
    submenu,
    index,
    toggleMenu,
    open }) {
    // console.log(data.name)

    // const [collapse, setCollapse] = useState(true)
    // const handleClick = (e) => {
    //     setCollapse(!collapse)
    // }
    // return (
    //     data.map(header => {
    //         return (<div key={uuidv4()} className="mainMenuSingle">
    //             <div onClick={handleClick} className={'mainMenuHeader ' + (!collapse ? 'collapse' : '')}>
    //                 <FontAwesomeIcon icon={faHtml5} />
    //                 {/* {<FontAwesomeIcon icon={`${header.icon_name}`} />} */}
    //                 {/* < FaHtml5 /> */}
    //                 {/* {`${header.icon}`} */}
    //                 {/* <FontAwesomeIcon icon={(header.icon_name).replace(/^"(.*)"$/, '$1')} /> */}
    //                 {/* <FontAwesomeIcon icon={['fas', header.icon_name]} /> */}
    //                 <h4>{header.name}</h4>
    //                 <h6 className="numberOfContents">{header.total_contents}</h6>
    //             </div>
    //             {header.submenu.length > 0 ? <SubItem data={header.submenu} /> : ''}
    //         </div>)
    //     })
    // )
    return (
        <div className="mainMenuSingle">
            <div onClick={() => toggleMenu(index)} className={'mainMenuHeader ' + (open ? 'collapse' : '')}>
                <FontAwesomeIcon icon={faHtml5} />
                <h4>{name}</h4>
                <h6 className="numberOfContents">{contentCount}</h6>
            </div>
            <SubItem data={submenu} />
        </div>
    )
}

export default MainItem
