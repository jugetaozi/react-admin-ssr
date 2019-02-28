## store redux分为  action reducer state   改变state的唯一方式是dispatch一个action

```javascript
actionCreator: () => {
  return {
    type:'actionName',
    payload:'载荷 异步操作通常为一个promise对象'  // redux-promise-middleware使payload变为一个promise对象
  }
}

action (redux-thunk): 
export const getUserInfo = () => (dispatch, getState) => {
	return dispatch({
		type: 'API_GET_USER_INFO',
		payload: getList(),
	});
};

export default function reducer (state = init_state, action) {
	console.log("dispatchAction", action);
	switch (action.type) {
		case 'API_GET_USER_INFO_FULFILLED':
			return {
				...state,
				name: "action.payload.message",
			};
		default:
			return state;
	}
}

connect解释器 第一个参数mapStateToProps,将reducer中的state映射到组件的props上
  第二个参数mapDispatchToProps 将reducer中的dispatch方法映射到组件的props上
```

## redux-thunk

redux-thunk是用来做异步的
他允许你的action可以返回函数, 带有dispatch和getState两个参数, 在这个action函数里, 异步的dispatch action;
action部分:

export const getFetchData = () => (dispatch, getState) => {
  //先去请求数据
    fetch('http://localhost:1234/api/test/user/users')
        .then(res => {
            return res.json();
        })
        .then(data => {
            //请求数据完成后再dispatch
            dispatch(getFetch(data))
        })
        .catch(e => {
            console.log(e)
        })
}

## redux-promise-middleware
```
redux-promise-middleware 关于 redux 的中间件,我们常用的一个用来处理异步的中间件为 redux-promise-middleware ,相比较 redux-promise 它保留了乐观更新的能力。在启用它之后,我们可以触发一个 payload 属性为 promise 对象的 action

const foo = () => ({
  type: 'FOO',
  payload: new Promise()
})
中间件会立即触发一个 action，类型为我们声明的类型加上_PENDING(后缀我们可以自己配置).

{ type: 'FOO_PENDING' }
等 promise 对象的状态发生改变(resolved 或者 rejected ), 中间件会触发另外一个 action，并且带着 promise 的信息。

{
  type: 'FOO_FULFILLED'
  payload: { ... }
}

{
  type: 'FOO_REJECTED'
  payload: { ... }
}
```
赋予了action  promise和异步结果自动dispatch到对应的reducer能力