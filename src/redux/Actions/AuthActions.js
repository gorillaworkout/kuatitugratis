import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useParams,useNavigate} from 'react-router-dom'
import AuthDataService from '../../Services/auth.services'
toast.configure()
export const LoginRedux=(obj,status,typeUser)=>{
    // const navigate = useNavigate()
    
    return async(dispatch)=>{
        // axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        // .then((res)=>{
        //     var stringify_token = JSON.stringify(token)
        //     var dataCustomer = res.data
        //     localStorage.setItem('token',stringify_token)
        //     dispatch({type:'LOGIN',token,dataCustomer})
            
        // }).catch((err)=>{
        //     console.log(err)
        // })
   
        if(status === 'google'){
            console.log(obj)
            const data  = await AuthDataService.getAllAuth();
            let arrFireStore = data.docs.map((doc)=>({...doc.data(),id:doc.id})) // data dari firestore
            console.log(arrFireStore)

            var filter = arrFireStore.findIndex((val)=>{
                console.log(val)
                console.log(val.googleId, obj.googleId)
                return val.googleId === obj.googleId
            })
            console.log(filter,' ini filter')
            if(filter !== -1){
                console.log('data ada bener')
                var stringify = JSON.stringify(obj)
                toast.error(`Selamat Datang ${obj.name}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                var token = 'gorillaworkoutToken'
                localStorage.setItem('loginGF',stringify)
                // dispatch({type:'LOGIN',token,obj}) 
            }else {
                console.log('data gaada, berarti harus nambah ke firestore')
                const dataCustomer = obj.profileObj
                var statusUser = typeUser
                if(typeUser === 'register_athlete'){
                    statusUser = 'Athlete'
                }else {
                    statusUser = 'Coach'
                }
                dataCustomer.status= statusUser
            }



        
        }else {
            //login normal
        }
    }
}

export const LogoutRedux=()=>{
    return (dispatch)=>{
        
        // console.log('logout redux jalan')
        localStorage.removeItem('token')
        dispatch({type:'LOGOUT'})
        toast.error('Berhasil Logout', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}