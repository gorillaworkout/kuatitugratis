const INITIAL_STATE = {
    allProduct          :[],
    allCategory         :[],
    allSubCategory      :[],
    allCategoryGroupBuy :[],
    allCategoryNew      :[],
    Cart                :[],
    isLoadingProduct    :true
} 


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'GETALLPRODUCT' :
            return {...state,allProduct:action.allProduct}
        case 'GETALLCATEGORY' :
            return {...state,allCategory:action.allCategory}
        case 'GETALLSUBCATEGORY' :
            return {...state,allSubCategory:action.allSubCategory}
        case 'GETALLCATEGORYGROUPBUY':
            return {...state,allCategoryGroupBuy:action.allCategoryGroupBuy}
        case 'GETALLCATEGORYNEW':
            return {...state,allCategoryNew:action.allCategoryNew}
        case 'LOADINGPRODUCT' :
            // console.log('loading jalan',state.isLoadingProduct)
            return {...state,isLoadingProduct:true}
        case 'ALLPRODUCTLOAD':
            return {...state,isLoadingProduct:false}
        case 'ADDPRODUCTTOCART':
            // console.log('addProduct to cart product reducer jalan',state.Cart)
            return {...state,Cart:action.Cart}
        default:
            return state
    }
}