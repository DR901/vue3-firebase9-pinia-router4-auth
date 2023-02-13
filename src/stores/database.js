import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, query, where, updateDoc} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import { db } from '../FireBaseConfig';
import { auth } from '../FireBaseConfig';
import router from '../router';


export const useDatabaseStore = defineStore('database',{
    state: () => ({ 
        documents: [],
        loadingDoc: false,
    }),
    actions: {
        async getUrls() {

            if (this.documents.length !==0 ){
                return;
            }

            this.loadingDoc = true;
            try{
                //const q = query(collection(db,'urls'), where ("user", "==","FnpWXYkaFid4KXdiXXPihBgx4Ib2"));
                const q = query(collection(db, "urls")
                                ,where("user", "==", auth.currentUser.uid)
                            );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    console.log(doc.id,doc.data());
                    this.documents.push({ 
                        id: doc.id, 
                        ...doc.data(), 
                    })
                });
            } catch(error){
                console.log(error);
            } finally{
                this.loadingDoc = false;
            }
        },
        async addUrl(name){
            try{
                const objetoDoc= {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid,
                }
                const docRef = await addDoc(collection(db,"urls"), objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id,
                })
                console.log(docRef);
            } catch(error) {
                console.log(error);
            } finally {

            }
        },
        async leerUrl(id) {
            try {
                // poner un loading


                const docref = doc(db, 'urls', id);
                const docSnap = await getDoc(docref);

                if (!docSnap.exists()) {
                    throw new Error("No Existe el id");
                }
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("El documento no le pertenece");
                }

                return docSnap.data().name;

            } catch(error) {
                console.log(error.message);
            } finally{

            }
        },
        async updateUrl(id,name){
            try{
                const docref = doc(db, 'urls', id);
                const docSnap = await getDoc(docref);

                if (!docSnap.exists()) {
                    throw new Error("No Existe el id");
                }
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("El documento no le pertenece");
                }
                
                await updateDoc(docref,{
                    name: name,
                });  
                
                this.documents = this.documents.map(item => item.id === id ? ({...item, name: name}) : item)
                // map devulve totalidad de elemntos
                router.push('/');

            } catch(error){
                console.log(error.message);
            }
        },
        async deleteUrl(id){
            try{
                const docref = doc(db, 'urls', id);
                const docSnap = await getDoc(docref);

                if (!docSnap.exists()) {
                    throw new Error("No Existe el id");
                }
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("El documento no le pertenece");
                }

                await deleteDoc(docref);
                this.documents = this.documents.filter(item => item.id !== id );
            } catch(error) {
                console.log(error.message);
            } finally{
                
            }
        }
    },
});