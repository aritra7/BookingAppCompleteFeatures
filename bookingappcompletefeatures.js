function saveMe(event){
    event.preventDefault();
    const userName = document.getElementById('username')
    const email = document.getElementById('email')
    const contactNo = document.getElementById('contact')
    const userDetails = {
        username: userName.value, email: email.value, contactNo: contactNo.value
    }
    localStorage.setItem(userDetails.email,JSON.stringify(userDetails))
    showUserOnList(userDetails)
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
    const localStorageObject = localStorage;
    let localStorageObjectKeys = Object.keys(localStorageObject)
    for(let i=0; i<localStorageObjectKeys.length; i++){
        let key = localStorageObjectKeys[i];
        let keyDetails = localStorageObject[key];
        const keyDetailsObj = JSON.parse(keyDetails)
        showUserOnList(keyDetailsObj)
    }
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