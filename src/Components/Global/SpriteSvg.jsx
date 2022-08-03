import React from 'react'
import Sprite from '../../Assets/img/icons/icons_sprite.svg'

const SpriteSvg = ({id, color}) => (
    <svg fill={color} >
        <use href={`${Sprite}#${id}`} />
    </svg>
)

SpriteSvg.defaultProps = {
    color: '#ffffff'
}

export default SpriteSvg