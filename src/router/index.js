import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import React, { lazy } from 'react'
// import Home from '@/view/Home'
// import Header from '@/view/Heder.jsx'
import FreshRouters from './fresh-routers'
import WaitingComponent from '@/component/WaitingComponent/index'
import Sider from '@/component/Sider/index'
import User from '@/component/User/index'
import './index.less'


const Home = lazy(  () => ('../view/Home'))
// 头部页
const Header = React.lazy(  () => ('../view/Heder'))

const sidebarTree = menuList => {
    let isValidArr = value => value && Array.isArray(value)
    let isValidArrChild = value =>
      value &&
      value.operationObjectives &&
      Array.isArray(value.operationObjectives) &&
      value.operationObjectives.length > 0

    function recursive(data) {
      return (
        isValidArr(data) &&
        data.map((item, index) => {
            const Component = WaitingComponent(item.component)
          if (item.children.length) return recursive(item.children)
          
          return (
            <Route
                key={item.path}
                exact
                path={item.path}
                title={item.title}
                render={(props) => {
                document.title = item.title
                return <Component {...props} />
            }}
        />
          )
        })
      )
    }
    return recursive(menuList)
  }

const Routes = (props) => (
    <Router>
        <div>
            <Switch>
                <Route path="/">
                    <div className="vertical-wrap">
                        <User />
                        <div className="main-wrapper">
                            <div className="SiderContainer">
                                <div className="Sider">
                                    {/* <Sider {...props} FreshRouters={FreshRouters} /> */}
                                </div>
                            </div>
                            <div className={true ? 'container ml100' : 'container'}>
                                <div className="mr20">
                                    <Switch>
                                    {/* {循环路由} */}
                                    {sidebarTree(FreshRouters)}
                                    <Route component={WaitingComponent(User)} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </div>
    </Router>
)

export default Routes
