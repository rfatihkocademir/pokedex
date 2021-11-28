/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import "./header-style.css"
export default function Header() {
    return (
        <div className="poke-header">
            <div className="poke-logo">
                <img src="http://placehold.it/256x64"/>
            </div>
            <div className="poke-search-area">
                    <input type="text" className="poke-search"/>
            </div>
        </div>
    )
}
