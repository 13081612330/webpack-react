import React from 'react'
/**
 *错误在渲染阶段中被捕获，但在事件处理程序中不会被捕获
 *
 * @class PotentialError
 * @extends {React.Component}
 */
class PotentialError extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: false }
  }
  componentDidCatch(error, info) {
    this.setState({ error, info })
  }
  render() {
    if (this.state.error) {
      return <h1>Error: {this.state.error.toString()}</h1>
    }
    return this.props.children
  }
}
export default PotentialError