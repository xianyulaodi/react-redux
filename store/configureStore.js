import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

/**我们是如何在 dispatch 机制中引入 Redux Thunk middleware 的呢？
我们使用了 applyMiddleware()，如下：
    import thunkMiddleware from 'redux-thunk'
    import createLogger from 'redux-logger'
    import { createStore, applyMiddleware } from 'redux'
    import { selectSubreddit, fetchPosts } from './actions'
    import rootReducer from './reducers'

    const loggerMiddleware = createLogger()

    const store = createStore(
      rootReducer,
      applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
      )
    )

    store.dispatch(selectSubreddit('reactjs'))
    store.dispatch(fetchPosts('reactjs')).then(() =>
      console.log(store.getState())

     // thunk 的一个优点是它的结果可以再次被 dispatch：
    )
**/

// 通过使用指定的 middleware，action creator 除了返回 action 对象外还可以返回函数。
// 这时，这个 action creator 就成为了 thunk。

/** 
这里面集中了所有的数据,store的数据集合是叫reducers这个家伙去做的
Store 就是用来维持应用所有的 state 树 的一个对象。 
改变 store 内 state 的惟一途径是对它 dispatch 一个 action。
**/
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)

//  [redux-thunk]里的action可以是一个函数，用来发起异步请求。
//  [redux-promise]里的action可以是一个promise对象，用来更优雅的进行异步操作。

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}


// Store的数据修改，本质上是通过Reducer来完成的。
// Store只提供get方法（即getState），不提供set方法，所以数据的修改一定是通过dispatch(action)来完成，
// 即：action -> reducers -> store
// Store除了存储数据之外，还有着消息发布/订阅（pub/sub）的功能，也正是因为这个功能，
// 它才能够同时连接着Actions和Views。
// dispatch方法 对应着 pub
// subscribe方法 对应着 sub