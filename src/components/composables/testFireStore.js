
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Leer datos de la colección "users"
// Get a list of cities from your database
async function getCities() {
    try{
        //const citiesCol = collection(db, 'cities');
    const citiesCol = collection(db, 'ciudades');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
    }catch(ex){
        console.log(ex)
    }
    
  }

const prueba = await getCities();

export {
    prueba
}