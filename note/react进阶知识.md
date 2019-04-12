# ref 简介:
在react典型的数据流中，`props`传递是父子组件交互的唯一方式；通过传递一个新的`props`值来使子组件重新`re-render`,从而达到父子组件通信。当然，就像react官网所描述的一样，在react典型的数据量之外，某些情况下（例如和第三方的dom库整合，或者某个dom元素focus等）为了修改子组件我们可能需要另一种方式，这就是`ref`方式。

React提供的这个`ref`属性，表示为对组件真正实例的引用，其实就是`ReactDOM.render()返回的组件实例`；需要区分一下，`ReactDOM.render()`渲染组件时返回的是组件实例；而渲染dom元素时，返回是具体的dom节点。

例如，下面代码:

```javascript
    const domCom = <button type="button">button</button>;



    const refDom = ReactDOM.render(domCom，container);



    //ConfirmPass的组件内容省略



    const refCom = ReactDOM.render(<ConfirmPass/>,container);



    console.log(refDom);



    console.log(refCom);
```

上述代码返回控制台结果如下图所示：。



`ref`可以挂到任何组件上，可以挂到组件上也可以是dom元素上；二者不同是与上图答案一样：

> 挂到组件（这里组件指的是有状态组件）上的ref表示对组件实例的引用，而挂载到dom元素上时表示具体的dom元素节点。

### ref可以设置回调函数

ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数执行的时机为：

- `组件被挂载后`，回调函数被立即执行，回调函数的参数为该组件的具体实例。
- `组件被卸载或者原有的ref属性本身发生变化时`，回调也会被立即执行，此时回调函数参数为`null`，以确保内存泄露。

例如下面代码：

```
    RegisterStepTwo = React.createClass({



        getInitialState(){



          return {visible: true};



        },



      changeVisible(){



        this.setState({visible: !this.state.visible});



      },



      refCb(instance){



        console.log(instance);



      },



      render(){



        return(



          <div>



            <button type="button" onClick={this.changeVisible}>{this.state.visible ? ‘卸载‘ : ‘挂载‘}ConfirmPass



            </button>



            {



              this.state.visible ?



                <ConfirmPass ref={this.refCb} onChange={this.handleChange}/>: null



             }



           </div>



         )



      }



    });
```

上述代码，渲染到页面时可以发现console.log出对应的组件实例，切换按钮时，`ConfirmPass`也在挂载与卸载之间切换，所以能看到不同的console.log结果。

### ref可以设置字符串

ref还可以设置为字符串值，而不是回调函数；这种方式基本不推荐使用，或者在未来的react版本中不会再支持该方式，但是可以了解一下。

例如下面`input`设置ref的值为字符串。

```
<input ref="input" />
```

然后在其他地方如事件回调中通过`this.refs.input`可以访问到该组件实例，其实就是dom元素节点。

```
let inputEl = this.refs.input;



//然后通过inputEl来完成后续的逻辑，如focus、获取其值等等
```

### 获取ref引用组件对应的dom节点

不管ref设置值是回调函数还是字符串，都可以通过`ReactDOM.findDOMNode(ref)`来获取组件挂载后真正的dom节点。

但是对于html元素使用ref的情况，ref本身引用的就是该元素的实际dom节点，无需使用`ReactDOM.findDOMNode(ref)`来获取，该方法常用于React组件上的ref。

### ref在有状态组件中的使用

上文说到过`ref`用到react有状态组件时，ref引用的是组件的实例；所以可以通过子组件的`ref`可以访问到子组件实例的`props`、`state`、`refs`、实例方法(非继承而来的方法)等等。

使用ref访问子组件情况可能是以下case：

- 访问子组件的某个具体的dom节点完成某些逻辑，通过`this.refs.childComponentRefName.refs.someDomRefName`来完成，例如[segmentfault上提问者提出的问题](https://segmentfault.com/q/1010000006253845/a-1020000008661267)。
- 可以访问子组件的公共实例方法完成某写逻辑。例如子组件定义了一个`reset`方法用来重置子组件表单元素值，这时父组件可以通过`this.refs.childComponentRefName.reset()`来完成子组件表单元素的重置。
- ...

不过话说回来，react不建议在父组件中直接访问子组件的实例方法来完成某些逻辑，在大部分情况下请使用标准的react数据流的方式来代替则更为清晰；

另外，上述case在组件关系嵌套很深时，这种方式就显得极为丑陋。

### ref在无状态组件中的使用

上文说到的react组件都是指有状态的，对于无状态组件`stateless component`而言，正如这篇文章[React创建组件的三种方式及其区别](http://www.cnblogs.com/wonyun/p/5930333.html)里描述的一样，无状态组件是不会被实例化的，在父组件中通过`ref`来获取无状态子组件时，其值为`null`，所以：

> 无法通过`ref`来获取无状态组件实例。

虽然无法通过ref获取无状态组件实例，但是可以结合复合组件来包装无状态组件来在其上使用ref引用。

另外，对于无状态组件我们想访问的无非是其中包含的组件或者dom元素，我们可以通过一个变量来保存我们想要的组件或者dom元素组件的实例引用。例如下面代码：

```
function TestComp(props){



    let refDom;



    return (<div>



        <div ref={(node) => refDom = node}>



            ...



        </div>



    </div>)



}
```

这样，可以通过变量`refDom`来访问到无状态组件中的指定dom元素了，访问其中的其他组件实例类似。

### 总结

`ref`提供了一种对于react标准的数据流不太适用的情况下组件间交互的方式，例如管理dom元素focus、text selection以及与第三方的dom库整合等等。 但是在大多数情况下应该使用react响应数据流那种方式，不要过度使用ref。

另外，在使用ref时，不用担心会导致内存泄露的问题，react会自动帮你管理好，在组件卸载时ref值也会被销毁。

最后补充一点：

> 不要在组件的`render`方法中访问`ref`引用，`render`方法只是返回一个虚拟dom，这时组件不一定挂载到dom中或者render返回的虚拟dom不一定会更新到dom中。

### 参考

- [Refs and the DOM](https://facebook.github.io/react/docs/refs-and-the-dom.html)
- [React从入门到精通系列之(14)refs和DOM元素](https://segmentfault.com/a/1190000007815434)
- [对组件的引用（refs）](http://bbs.reactnative.cn/topic/608/%E5%AF%B9%E7%BB%84%E4%BB%B6%E7%9A%84%E5%BC%95%E7%94%A8-refs)