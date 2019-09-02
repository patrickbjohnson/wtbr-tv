import React from 'react'
import { animated, useSpring } from 'react-spring'

function Transition({ children, delay = 0, ...rest }) {
    const props = useSpring({
      from: {
        transform: 'translateY(48px)',
        opacity: 0
      },
      to: {
        transform: 'translateY(0)',
        opacity: 1
      },
      delay,
      config: { mass: 1, tension: 280, friction: 60 },
    });

    return (
        <animated.div style={props} {...rest}>
            { children }
        </animated.div>
    )
}

export default Transition;
