import React from 'react';
import ReactDom from 'react-dom'
import { ConfigProvider } from 'antd'
// import { AppContainer } from 'react-hot-loader'
import Routes from '@/router/index'
import PotentialError from './component/PotentialError/index'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Layouts from '@/view/Layout'

// import { Provider } from 'react-redux'

ReactDom.render(
  // <ConfigProvider locale={zhCN}>
  //   {/* <AppContainer> */}
  //     <PotentialError>
        <Routes></Routes>
  //     </PotentialError>  
  //   {/* </AppContainer> */}
  // </ConfigProvider>
// <Layouts></Layouts>
  ,
  document.getElementById('app')
)