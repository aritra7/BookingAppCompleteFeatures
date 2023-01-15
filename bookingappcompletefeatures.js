function saveMe(event){
    event.preventDefault();
    const userName = document.getElementById('username')
    const email = document.getElementById('email')
    const contactNo = document.getElementById('contact')
    const userDetails = {
        username: userName.value, email: email.value, contactNo: contactNo.value
    }
    // To save user details in the local storage and show
    // localStorage.setItem(userDetails.email,JSON.stringify(userDetails))
    // showUserOnList(userDetails)
    // To save user details to the cloud storage / crud crud and show
    axios.post('https://crudcrud.com/api/01d3733d06b14a139325aae2e5514053/AppoinmentData',userDetails)
    .then((response)=>showUserOnList(response.data))
    .catch((err)=>document.body.innerHTML += `${err}`)
}
function showUserOnList(users){
    document.getElementById('username').value =''
    document.getElementById('email').value =''
    document.getElementById('contact').value =''
    const li = `<li class="list-group-item" id='${users.email}'>${users.username} : ${users.email} <button class="btn btn-success" onclick=editinfo('${users.username}','${users.email}','${users.contactNo}')>Edit</button> <button class="btn btn-danger" onclick=deleteinfo('${users.email}')>Delete</button></li>`
    const parentNode = document.getElementById('listofusers')
    parentNode.innerHTML += li
}
window.addEventListener("DOMContentLoaded",()=>{
    // To fetch data from local storage after refresh to visible to screen
    // const localStorageObject = localStorage;
    // let localStorageObjectKeys = Object.keys(localStorageObject)
    // for(let i=0; i<localStorageObjectKeys.length; i++){
    //     let key = localStorageObjectKeys[i];
    //     let keyDetails = localStorageObject[key];
    //     const keyDetailsObj = JSON.parse(keyDetails)
    //     showUserOnList(keyDetailsObj)
    // }
    axios.get("https://crudcrud.com/api/01d3733d06b14a139325aae2e5514053/AppoinmentData")
    .then((response)=>{
        for(let i=0; i<response.data.length; i++){
            let key = response.data[i];
            showUserOnList(key)
        }
    })
    .catch((err)=>document.body.innerHTML +=`Error: ${err}`)
})
function editinfo(editNameInfo, editEmailInfo, editContactInfo){
    document.getElementById('username').value = editNameInfo;
    document.getElementById('email').value = editEmailInfo;
    document.getElementById('contact').value = editContactInfo;
    deleteinfo(editEmailInfo)
}
function deleteinfo(delUserInfo){
    // console.log(delUserInfo)
    localStorage.removeItem(delUserInfo)
    removeUserInfoFromScreen(delUserInfo);
}
function removeUserInfoFromScreen(usr){
    const parentNode = document.getElementById('listofusers')
    const toBeDelete = document.getElementById(usr)
    if(toBeDelete){
        parentNode.removeChild(toBeDelete)
    }
}