import React from 'react'
import { NavLink } from 'react-router-dom'

function SubItem({ data }) {
    data = (data).sort(function (a, b) {
        return a.submenu_order - b.submenu_order
    })
    return (
        <div className="menuitems">
            {
                data.map(submenu => {
                    return (
                        <NavLink activeClassName="active" key={submenu.id} to={`${submenu.id}`}>{submenu.submenu_order}. {submenu.title}</NavLink>
                    )
                })
            }
        </div>
    )
}

export default SubItem
