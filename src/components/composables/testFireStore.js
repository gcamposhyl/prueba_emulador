
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Leer datos de la colección "users"
// Get a list of cities from your database
async function getCities() {
    try{
        //const citiesCol = collection(db, 'cities');
    console.log("0")
    const citiesCol = collection(db, 'ciudades');
    console.log("1")
    const citySnapshot = await getDocs(citiesCol);
    console.log("2")
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log("3")
    return cityList;
    }catch(ex){
        console.log(ex)
    }
    
  }

const prueba = await getCities();

export {
    prueba
}