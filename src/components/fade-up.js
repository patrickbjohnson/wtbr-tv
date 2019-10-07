import React from 'react'
import { animated, useSpring } from 'react-spring'

function FadeUp({ children, isVisible, delay = 0, ...rest }) {
  const props = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: isVisible ? 1 : 0,
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

export default FadeUp;
