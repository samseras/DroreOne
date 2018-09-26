/*
*基础设施设备类型
* */

import * as types from '../mutations-type'
import Vue from 'vue'

const lib = {
    state: {
        currentNum: {currentNum: 1},
        totalNum: {totalNum: 1}
    },
    getters: {
        getCurrentNum (state) {
            return state.currentNum.currentNum
        },
        getTotalNum (state) {
            return state.totalNum.totalNum
        }
    },
    setters: {},

    mutations: {
        [types.CURRENT_NUM] (state, data) {
            Vue.set(state,'currentNum',data)
        },
        [types.TOTAL_NUM] (state, data) {
            Vue.set(state,'totalNum',data)
        },
    },
    actions: {
    }
}

export default lib

