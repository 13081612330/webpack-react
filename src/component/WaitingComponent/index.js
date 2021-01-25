import React, { Suspense } from 'react'
import { Spin } from 'antd'

function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Spin />
    </div>}>
      <Component {...props} />
    </Suspense >
  )
}

export default WaitingComponent