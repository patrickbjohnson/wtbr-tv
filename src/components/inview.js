import { InView } from 'react-intersection-observer'
import React from 'react'

const IntersectionObserver = ({ children, inViewHandler }) => {
  return (
    <InView as="div" threshold={0.5} triggerOnce={true}>
      {({ inView, ref }) => {
        return <div ref={ref}>{children}</div>
      }}
    </InView>
  )
}

export default IntersectionObserver
