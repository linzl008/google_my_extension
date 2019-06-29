
// initial state
// shape: [{ id, quantity }]
const state = {
    menu: [
        { label :"首页" ,icon:"el-icon-s-home" ,index:"/home", isShow:true},
        { label :"设置" ,icon:"el-icon-s-tools" ,index:"/setting", isShow:true},
    ],
}

// getters
const getters = {
    getMenu: (state, getters, rootState) => {
        return state.menu.filter(item => item.isShow);
    },
    getAllMenu: (state, getters, rootState) => {
        return state.menu;
    },
}

// actions
const actions = {
    setMenu({ state, commit }, newMenu){
        commit('setMenu', newMenu);
    },
    toggleMenuState({ state, commit }, index){
        commit('toggleMenuState', index);
    }
}

// mutations
const mutations = {
    setMenu(state,newMenu){
        console.log('enter mutations');
        state.menu = newMenu;
        localStorage.setItem('lzl_menu',JSON.stringify(state.menu));
    },
    toggleMenuState(state,index){
        state.menu[index].isShow = !state.menu[index].isShow;
        localStorage.setItem('lzl_menu',JSON.stringify(state.menu));
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}