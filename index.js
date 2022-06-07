
function saveToLocalStorage(event) {
  event.preventDefault();
  const expenseamount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

    const obj = {
        expenseamount,
        description,
        category //unique

    }

    axios.post("https://crudcrud.com/api/87971a5ca67b4552831c6dc3ebb70b16/appointmentData", obj)
    .then((response) => {
      showNewUserOnScreen(response.data)
      // console.log(response)
    })
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
      console.log(err)
    })
    // localStorage.setItem("userDetails" + description, JSON.stringify(object)); // localStorage.setItem("userDetailEmail" + emailId, emailId);
    // // listOfPeople.push(object)

    // addNewLineElement(object);
  }

  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/87971a5ca67b4552831c6dc3ebb70b16/appointmentData")
    .then((response) => {
      console.log(response)
  
      for(var i=0; i<response.data.length; i++) {
        showNewUserOnScreen(response.data[i])
      }
    })
    .catch((error) => {
      console.log(error)
    })
  })


function showNewUserOnScreen(user){
  
  
  const parentNode = document.getElementById('listOfPeople');
  const childHTML = `<li id=${user._id}> ${user.amount} - ${user.description} - ${user.category}
  <button onclick=deleteUser('${user._id}')> Delete Expense </button>
  <button onclick=editUserDetails('${user.amount}', '${user.description}','${user.category}','${user._id}')>Edit Expense </button>
  </li>`

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User
  
function editUserDetails(amount, description, category, userId){
  
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;

  deleteUser(userId)
}


// deleteUser('abc@gmail.com')
function deleteUser(userId){
  axios.delete(`https://crudcrud.com/api/87971a5ca67b4552831c6dc3ebb70b16/appointmentData/${userId}`)
  .then((response) => {
    removeUserFromScreen(userId)
  })
  .catch((err) => {
    console.log(err)
  })
 
  // console.log(emailId)
  // localStorage.removeItem(emailId);
  // removeUserFromScreen(emailId);

}

function removeUserFromScreen(userId){
  const parentNode = document.getElementById('listOfPeople');
  const childNodeToBeDeleted = document.getElementById(userId);
  if(childNodeToBeDeleted) {
  parentNode.removeChild(childNodeToBeDeleted)
  }
}