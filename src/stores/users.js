import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../FireBaseConfig';
//import { router } from '../router';
import router from "../router";


export const useUserStore = defineStore('userStore', {
    state: () => ({ 
        userData: null,
        loadingUser: false,  // para bloqueo boton
        loadingSession: false, // para evitar vista Login register
    }),
    actions: {
       async registerUser(email, password){
            this.loadingUser= true;
            try {
                const { user } = await createUserWithEmailAndPassword (auth,email,password);
                this.userData = { email: user.email, uid: user.id}
                router.push('/');
            }catch(error){
                console.log(error)
            }finally{
                this.loadingUser= false;
            }
       },
       async loginUser(email, password){
        this.loadingUser= true;
        try{
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            this.userData = {email: user.email, uid: user.id };
            router.push('/');
        } catch(error){
            console.log(error);
        } finally{
            this.loadingUser= false;
        }
       },
       async logoutUser(){
        try{
            await signOut(auth);
            this.userData = null;
            router.push('/login');
        } catch(error){
            console.log(error);
        }
       },
       //Genera una promesa
       currentUser(){
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(auth, user => {
                    if (user){
                        this.userData = {email: user.email, uid: user.uid };
                    } else {
                        this.userData = null;
                    }
                    resolve(user);
                }, (e) => reject(e));
                unsuscribe();
            })
       }
    }
});