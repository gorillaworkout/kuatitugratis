import axios from 'axios'
// import { GrAction } from 'react-icons/gr'


export const GetAllProduct=()=>{
    return (dispatch)=>{
        dispatch({type:'LOADINGPRODUCT',isLoading:true})
          var all_array_groupbuy = []
          var all_array_new      = []
        axios.post('https://products.sold.co.id/get-product-details')
        .then((res)=>{
            // GET ALL CART FROM STORAGE
            var Cart = JSON.parse(localStorage.getItem('itemsInCart'))
            dispatch({type:'GETALLCARTSTORAGE',Cart})
            console.log(Cart)
            // GET ALL CART FROM STORAGE
            var allProduct = res.data
            dispatch({type:'GETALLPRODUCT',allProduct:allProduct})
            var stringify_all_product = JSON.stringify(res.data)
            localStorage.setItem('all_product',stringify_all_product)
            res.data.forEach((val,index,array)=>{
                if(val.GroupBuy_Purchase === true || val.GroupBuy_Purchase === 'true'){
                    all_array_groupbuy.push(val)
                    // setAllProductGroupbuy(all_array_groupbuy)
                }
                if (val.Categorize_NEW === true || val.Categorize_NEW === 'true') {
                    all_array_new.push(val)
                    // setAllProductNew(all_array_new)
                }
                if(index === array.length - 1){
                    dispatch({type:'GETALLCATEGORYGROUPBUY',allCategoryGroupBuy:all_array_groupbuy})
                    dispatch({type:'GETALLCATEGORYNEW',allCategoryNew:all_array_new})
                    console.log('selesai looping get all product')
                }
            })

            // GET ALL CATEGORY
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
            .then((res)=>{
                var stringify_all_product = JSON.stringify(res.data)
                localStorage.setItem('all_category',stringify_all_product)
                dispatch({type:'GETALLCATEGORY',allCategory:res.data})

                var all_array_subcategory = []
                var allCategory = res.data
                allCategory.forEach((val,indexCategory,arrayCategory)=>{
                 
                    // console.log(all_array_subcategory)
                    axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
                    .then((res)=>{
                        var allSubcategory = res.data
                        all_array_subcategory.push([{"Category":val.Category,allSubcategory}])
                        var stringify_subcategory = JSON.stringify(all_array_subcategory)
                        console.log(all_array_subcategory)
                        if(indexCategory === arrayCategory.length - 1){
                            localStorage.setItem('all_subcategory',stringify_subcategory)
                            dispatch({type:'GETALLSUBCATEGORY',allSubCategory:all_array_subcategory})
                            dispatch({type:'ALLPRODUCTLOAD'})
                            // console.log(all_array_subcategory)
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                })



            }).catch((err)=>{
                console.log(err)
            })

        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const getAllSubCategory=(Category)=>{
    return (dispatch)=>{
        var all_array_subcategory = []
        var allCategory = Category
    
        allCategory.forEach((val,indexCategory,arrayCategory)=>{
            all_array_subcategory.push({
                Category:val.Category
            })
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
            .then((res)=>{
                if(res.data.length > 0 ){
                    res.data.forEach((val,index,array)=>{
                        all_array_subcategory[indexCategory].push(val)
                    })
                }else {
                    all_array_subcategory[indexCategory].push(res.data)
                }
                var stringify_subcategory = JSON.stringify(all_array_subcategory)
                console.log(all_array_subcategory)
                if(indexCategory === arrayCategory.length - 1){
                    localStorage.setItem('all_subcategory',stringify_subcategory)
                    dispatch({type:'GETALLSUBCATEGORY',allSubCategory:all_array_subcategory})
                    dispatch({type:'ALLPRODUCTLOAD'})
                    // console.log(all_array_subcategory)
                }
            }).catch((err)=>{
                console.log(err)
            })
        })
        // allCategory.forEach((val,index,array)=>{
        //     axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
        //     .then((res)=>{
        //         if(res.data.length > 0){
        //             res.data.forEach((val,index,array)=>{
        //                 all_array_subcategory.push(val)
        //             })
                    
        //         }else {
        //             all_array_subcategory.push(res.data)
        //             // setLoadingFetchingData(false)
        //         }
        //         var stringify_subcategory = JSON.stringify(all_array_subcategory)
        //         if(index === array.length - 1 ){
        //             localStorage.setItem('all_subcategory',stringify_subcategory)
        //             // console.log(all_array_subcategory)
        //             dispatch({type:'GETALLSUBCATEGORY',allSubCategory:all_array_subcategory})
        //             dispatch({type:'ALLPRODUCTLOAD'})
        //             console.log(all_array_subcategory)
        //             // console.log('dispatch loading, harusnya false')
        //         }
        //     }).catch((err)=>{
        //         console.log(err)
        //     })
        // })
    }
}

// FUNCTION UNTUK TAMBAH KE CART JIKA LOCAL STORAGE KOSONG ( itemsInCart)
export const addToCartRedux=(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name,Product_Img,Normal_Price,Groupbuy_Price,quantity_product)=>{
    return (dispatch)=>{
        
        var cart = [
            {
                productNo:Product_Code,
                quantity:parseInt(Total_Qty),
                company_address:Company_Address,
                weight_kg:Product_Weight,
                product_name:Product_Name,
                img:Product_Img,
                normal_price:Normal_Price,
                groupbuy_price:Groupbuy_Price,
                Stock_Quantity:quantity_product
            }
        ]
        var pushToStorage2 = JSON.stringify(cart)
        localStorage.setItem('itemsInCart',pushToStorage2)
        dispatch({type:'ADDPRODUCTTOCART',cart})
        dispatch({type:'GETALLCARTSTORAGE',cart})
        console.log(cart)
        
    }
}
// FUNCTION UNTUK TAMBAH KE CART JIKA LOCAL STORAGE KOSONG ( itemsInCart)


// FUNCTION UNTUK UPDATE CART LOCALSTORAGE -> KALAU ITEMSINCART UDH ADA TAPI PRODUCT YANG MAU DITAMBAH BELUM ADA
export const updateToCartRedux=(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name,dataParse,Product_Img,Normal_Price,Groupbuy_Price)=>{
    return (dispatch)=>{

        // if(dataParse){
            var filterdatakosong = dataParse.filter((filtering)=>{
                console.log(filtering.productNo , Product_Code)
                if(filtering.productNo === Product_Code){
                    return filtering
                }
            })
            if(filterdatakosong.length){
                var objIndex = dataParse.findIndex(
                    (obj) => obj.productNo === Product_Code
                  );
                  console.log(dataParse[objIndex])
                  dataParse[objIndex].quantity = parseInt(dataParse[objIndex].quantity)  + parseInt(Total_Qty)
            }else {

                var data = {
                    productNo:Product_Code,
                    quantity:parseInt(Total_Qty),
                    company_address:Company_Address,
                    weight_kg:Product_Weight,
                    product_name:Product_Name,
                    img:Product_Img,
                    normal_price:Normal_Price,
                    groupbuy_price:Groupbuy_Price
                }
                dataParse.push(data)
                console.log('168 selesai else')
            }
            console.log(dataParse)
            var pushToStorage = JSON.stringify(dataParse);
            localStorage.setItem("itemsInCart", pushToStorage);
            dispatch({type:'ADDPRODUCTTOCART',dataParse})
            dispatch({type:'GETALLCARTSTORAGE',dataParse})
            console.log(dataParse)


    }
}
// FUNCTION UNTUK UPDATE CART LOCALSTORAGE -> KALAU ITEMSINCART UDH ADA TAPI PRODUCT YANG MAU DITAMBAH BELUM ADA


// FUNCTION UNTUK UPDATE QTY YANG UDAH ADA DI CART
export const updateQtyToCartRedux=()=>{
    return (dispatch)=>{

    }
}

// FUNCTION UNTUK UPDATE QTY YANG UDAH ADA DI CART
