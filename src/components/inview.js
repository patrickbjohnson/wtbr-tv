import React from 'react'
import { InView } from 'react-intersection-observer'

const IntersectionObserver = ({ children }) => {
  return (
    <InView as="div" threshold={0.5} triggerOnce={true}>
      {({ inView, ref }) => {
        return <div ref={ref}>{children}</div>
      }}
    </InView>
  )
}

export default IntersectionObserver
