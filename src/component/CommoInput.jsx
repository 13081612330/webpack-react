import React, { Component } from 'react'
import { Form, Input } from 'antd'
const FormItem = Form.Item
const defaultStyle = { width: '100%' }
// import _ from 'lodash'
import './index.less'

export default class CommonInput extends Component {
  constructor(props) {
    super()
    // this._loadStyle = this._loadStyle().bind(this)
    this.state = {}
  }
  _loadStyle() {
    let props,
      result = defaultStyle

    return style => {
      if (style !== props) {
        props = style
        result = Object.assign({}, defaultStyle, style)
      }

      return result
    }
  }
  render() {
    const {
      getFieldDecorator,
      style,
      required,
      disabled,
      className = '',
      isHideRequireIcon,
      decorator,
      label = 'label',
      size = 'default',
      max,
      message,
      type,
      validateFirst,
      labelCol,
      wrapperCol,
      initialValue,
      colon = false,  // 是否显示输入框后的冒号
      inputType,
      validator,
      validateTrigger,
    //   ...props
    } = this.props
    let settings = {}
    let inputSettings = {
    //   ...props,
    //   style: this._loadStyle()(style),
      autoComplete: 'off',
      size,
      max,
      type: inputType,
      disabled: disabled || false
    }
    let formItemClass = `YH-form-item ${className} ${isHideRequireIcon ? 'no-required-icon' : ''}`

    /*
    * 表单配置:
    * validateFirst 当某一检验规则不通过时，是否停止剩下规则的校验
    * initialValue 子节点的初始值
    * validateTrigger  校验子节点的时机 默认 onChange事件触发
    * */
    if (validateFirst !== undefined) {
      settings.validateFirst = validateFirst
    }
    if (initialValue !== undefined) {
      settings.initialValue = initialValue
    }
    if (validateTrigger !== undefined) {
      settings.validateTrigger = validateTrigger
    }
    /*
    * 校验规则 ： getFieldDecorator 第二个参数里的rules
    * */
    if (!disabled) { // 支持rules，和单个项 两种格式 单项模式写的不全 如需 自行补充
      let rules = []
      let rulesFlag = false

      const propsRules = this.props.rules || []
    //   if (!_.isEmpty(propsRules)) {
    //     rules = [...propsRules]
    //     rulesFlag = true
    //   }

      // 是否为必选项
      if (required) {
        rules.push({ required: true, message })
        rulesFlag = true
      }
      // 检验类型
      if (type !== undefined) {
        rules.push({ type, message })
        rulesFlag = true
      }
      // //  报错信息
      // if (message !== undefined) {
      //   rules.message = message
      //   rulesFlag = true
      // }
      if (validator !== undefined) {
        rules.push({ validator, message })
        rulesFlag = true
      }
      rulesFlag && (settings.rules = [...rules])
    }

    return (
      <FormItem className={formItemClass} label={label} labelCol={labelCol} wrapperCol={wrapperCol} colon={colon}>
        {

          getFieldDecorator(decorator || 'decorator', settings)(
            <Input {...inputSettings} />
          )
        }
      </FormItem>
    )
  }
}
