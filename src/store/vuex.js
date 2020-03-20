let Vue = undefined

const forEach = (obj, callback) => {
    Object.keys(obj).forEach((key, val) => {
        callback(key, obj[key])
    })
}

const install = (_Vue) => {
    Vue = _Vue
    // 1.给每个组件注册一个 $store 属性
    // 先渲染父组件  后渲染子组件  深度优先
    Vue.mixin({
        beforeCreate() {
            console.log(this.$options.name)
            // 判断是父组件还是子组件
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        },
    })
}


class Store {
    constructor(options) {
        // 把state 变成可监控的属性  get  set  属性
        this.$vm = new Vue({
            data() {
                return {
                    // observer  订阅发布模式  
                    state: options.state
                }
            },
        })
        let getters = options.getters || {}
        let mutations = options.mutations || {}
        let actions = options.actions || {}
        this.getters = {}
        this.mutations = {}
        this.actions = {}
        // 把getters的属性定义到this.getters中
        forEach(getters, (gettersName, fn) => {
            Object.defineProperty(this.getters, gettersName, {
                get: () => {
                    return fn(this.state)
                }
            })
        })
        // 把mutations的属性定义到this.mutations中去
        forEach(mutations, (mutationsName, fn) => {
            this.mutations[mutationsName] = (payload) => {
                fn(this.state, payload)
            }
        })
        // 把actions的属性定义到this.actions中去
        forEach(actions, (actionsName, fn) => {
            this.actions[actionsName] = (payload) => {
                fn(this, payload)
            }
        })

        // 处理modules 
        // 1. 格式化数据i
        // 1) 收集模块
        
    }


    commit = (type, payload) => {
        // 找到对应的方法执行
        this.mutations[type](payload)
    }

    dispatch = (type, payload) => {
        this.actions[type](payload)
    }

    get state() {
        return this.$vm.state
    }


}


export default {
    install,
    Store
}