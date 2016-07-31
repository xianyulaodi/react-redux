import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchPostsIfNeeded,weekChoice,giftIdChoice,tabChange} from '../actions'
import * as TodoActions from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.weekChoiceFn = this.weekChoiceFn.bind(this)
    this.giftIdChoiceFn = this.giftIdChoiceFn.bind(this)
    this.tabFn = this.tabFn.bind(this)
  }

  //初始化渲染后触发
  componentDidMount() {
    const { dispatch,isLastWeek,giftId} = this.props
    dispatch(fetchPostsIfNeeded(isLastWeek,giftId))
  }

  //每次接受新的props触发
  componentWillReceiveProps(nextProps) {

    if ((nextProps.isLastWeek !== this.props.isLastWeek) || (nextProps.giftId !== this.props.giftId) ) {
      const { dispatch, isLastWeek ,giftId} = nextProps
      dispatch(fetchPostsIfNeeded(isLastWeek,giftId))
    }

  }

  // 上周还是本周
  weekChoiceFn(isLastweek) {

    this.props.dispatch(weekChoice(isLastweek));
    
  }
  
  // 送出热气球星榜还是魔术帽星榜
  giftIdChoiceFn(giftId) {
    this.props.dispatch(giftIdChoice(giftId));
    
  }

  tabFn (tabId) {

      this.props.dispatch(tabChange(3));
    
  }

  render() {
    const { receiveData } = this.props  //this.props里面包含着所有的状态
    return (
      <div>
            <a href="#" onClick={this.weekChoiceFn.bind(this,1)}>上周</a> 
            <br />
            <a href="#" onClick={this.weekChoiceFn.bind(this,0)}>本周</a>
            <br />
           <a href="#" onClick={this.giftIdChoiceFn.bind(this,401)}>热气球星榜</a><br />
           <a href="#" onClick={this.giftIdChoiceFn.bind(this,402)}>魔术帽星榜</a><br />
           <a href="#" onClick={this.tabFn}>
              tabId
            </a>
            <br />
            这里是请求到的数据 <br />{JSON.stringify(receiveData)}<br />
      </div>
    )
  }
}


function mapStateToProps(state) {
  // 这里很重要，这里需要用到的状态都要返回，不然无法实现
  const { receiveData ,isLastWeek,giftId,tabIdState} = state
  return {
    receiveData,
    isLastWeek,
    giftId,
    tabIdState
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   }
// }
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(App)

