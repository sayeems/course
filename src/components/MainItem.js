import React, { useState } from 'react'
import SubItem from './SubItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHtml5, FaCss3 } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';


function MainItem({
    name,
    icon,
    contentCount,
    id,
    submenu,
    index,
    toggleMenu,
    open }) {

    return (
        <div className="mainMenuSingle">
            <div onClick={() => toggleMenu(index)} className={'mainMenuHeader ' + (open ? 'collapse' : '')}>
                <FontAwesomeIcon icon={['fab', `${icon}`]} />
                <h4>{name}</h4>
                <h6 className="numberOfContents">{contentCount}</h6>
            </div>
            <SubItem data={submenu} />
        </div>
    )
}

export default MainItem
