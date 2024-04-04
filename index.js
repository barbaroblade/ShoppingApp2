import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
 import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://compras2-991a1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase (app)
const shoppingListInDB = ref (database,"shoppingList")


const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButton.addEventListener('click', function(){
  let inputValue = inputField.value
  push(shoppingListInDB, inputValue)
  

  clearinputField()
  AppendItemToShoppingListEl(inputValue)



});

onValue(shoppingListInDB, function(snapshot){

  if (snapshot.exists()){

let itemsArray = Object.entries(snapshot.val())
  

   clearShoppingListEl()

   for(let i = 0; i < itemsArray.length; i++){
    let currentItem = itemsArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    AppendItemToShoppingListEl(currentItem)
   }
   } else{
    shoppingListEl.innerHTML = "No items here... yet"

   }

   })
function clearShoppingListEl(){
  shoppingListEl.innerHTML = ""
}
function clearinputField(){
  inputField.value = '';

  }
  function AppendItemToShoppingListEl(Item){
    let ItemID = Item[0]
    let ItemValue = Item[1]

    let newEl = document.createElement("li")
    newEl.textContent = ItemValue

    newEl.addEventListener ("click", function(){
      
      let exactLocationOfItemInDB = ref(database,`shoppingList/${ItemID}`)

      remove(exactLocationOfItemInDB) 
    })
    shoppingListEl.append(newEl)
    }
   