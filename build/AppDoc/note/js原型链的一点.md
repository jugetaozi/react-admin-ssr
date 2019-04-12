Function.__proto__===Function.prototype怎么解释？

因为Function本身也是一个Function对象，也就是var Function = new Function()，这看起来有点鸡和蛋的意思，不过如果先给你一个蛋，
那必然就是先有蛋后有鸡了。所以如果先给你一个Function对象的原形[[Prototype]]，那么就可以通过一个函数构建出Function的实例了，这个函数就是Function本身。