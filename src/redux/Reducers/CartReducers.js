const INITIAL_STATE = {
    Cart                :[],
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'GETALLCARTSTORAGE':
            // console.log('get all cart reducers',action.Cart)
            return {...state,Cart:action.Cart}
        default:
            return state
    }
}