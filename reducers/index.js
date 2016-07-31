import { combineReducers } from 'redux'
import {
  RECEIVE_POSTS,
  IS_LASTWEEK,
  GIFT_ID_CHOICE,
  TAB_CHANGE
} from '../actions'


function isLastWeek(state = 0, action) {
  switch (action.type) {
    case IS_LASTWEEK:
      return action.weekOffset  //这里面的值是和action里面的值对应的
    default:
      return state
  }
}

function tabIdState(state=0,action){
  switch(action.type){
    case TAB_CHANGE :
      return action.tabId
    default:
      return state
  }
}

function giftId(state = 401, action) {
  
  switch (action.type) {

    case GIFT_ID_CHOICE:
      return action.giftId  
       //这里面的值是和action里面的值对应的
    default:
      return state
  }
}

/**
function posts(state = {
  items: []
}, action) {
  console.log(123)
  console.log(action)
  switch (action.type) {

    case RECEIVE_POSTS:


      /** Object.assign是ES6的一个语法。合并对象，将对象合并为一个，前后相同的话，后者覆盖强者。详情可以看这里
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      例如：
          var obj = { a: 1 };
          var copy = Object.assign({}, obj,{'b':2});
          console.log(copy); // { a: 1,b:2 }
          
          var obj = { a: 1 };
          var copy = Object.assign({}, obj,{'a':2});
          console.log(copy); // { a: 2}

      **/

    /** return Object.assign({}, state, {
        items: action.posts //数据都存在了这里
      })
    default:
      return state
  }
}
**/
//废弃、接收到、开始接受新闻后，将state.postsByReddit设为相关参数
/**
function postsByReddit(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case RECEIVE_POSTS:
      console.log('jjj');
      console.log(action.reddit);
      console.log(state);
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}
**/
function receiveData(state ={}, action) {
  console.log(action);
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        items: action.posts //数据都存在了这里
      })
    default:
      return state
  }
}

// 将所有的reducer结合为一个,传给store
const rootReducer = combineReducers({
  receiveData,
  isLastWeek,
  giftId,
  tabIdState
})

export default rootReducer
