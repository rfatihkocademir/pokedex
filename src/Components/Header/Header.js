/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import "./header-style.css"
export default function Header() {
    return (
        <div className="poke-header">
            <div className="poke-logo">
                <img src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png"/>
            </div>
            <div className="poke-search-area">
                    <input type="text" className="poke-search"/>
            </div>
        </div>
    )
}
