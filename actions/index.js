// 由于目前大多数浏览器原生还不支持它，建议你使用 isomorphic-fetch 库：
// 每次使用 `fetch` 前都这样调用一下
import fetch from 'isomorphic-fetch'
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const IS_LASTWEEK = 'IS_LASTWEEK';
export const TAB_CHANGE = 'TAB_CHANGE';
export const GIFT_ID_CHOICE = 'GIFT_ID_CHOICE';


// 本案例的状态有以下几个:

// 1、上周和本周的切换  
// 2、点击四个tab的切换
// 3、排行版和规则页的切换
// weekOffset 选择上周还是本周，本周为0，上周为 1

// 目前需要解决的问题，异步的问题我这里已经解决了，现在要做的就是解决同步的问题，也就是排行版和规则页的切换

export function weekChoice(weekOffset) {
  return {
    type: IS_LASTWEEK,
    weekOffset
  }
}
// giftId 礼物的id  401是热气球，402是魔术帽
export function giftIdChoice(giftId) {
  return {
    type: GIFT_ID_CHOICE,
    giftId
  }
}

export function tabChange(tabId) {

  return {
     type: TAB_CHANGE, 
     tabId
  }

}

//获取数据成功的action，将所有的数据传回去
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    posts:json
  }
}

function fetchPosts(weekOffset,giftId) {

  return function (dispatch) {
    
    // return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      // data.platform=1; //1 PC 2、正版ios  3、越狱版ios  4、安卓；
      // data.weekOffset=weekOffset;  // 0 本周 1上周
      // data.giftId=giftId;   // 礼物id 401是热气球，402是魔术帽

    return fetch(`http://api.ys.m.yy.com/api/internal/gift/rank.json?data={"platform":1,"weekOffset":${weekOffset},"giftId":${giftId},"uid":0}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(weekOffset, json))
      )
  }
}

//如果需要则开始获取文章
export function fetchPostsIfNeeded(weekOffset,giftId) {

  return (dispatch, getState) => {

      return dispatch(fetchPosts(weekOffset,giftId))

    }
}



