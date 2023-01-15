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
    axios.post('https://crudcrud.com/api/2f4646366ae84572b667c04f4fc81612/AppoinmentData',userDetails)
    .then((response)=>showUserOnList(response.data))
    .catch((err)=>document.body.innerHTML += `${err}`)
}
function showUserOnList(users){
    document.getElementById('username').value =''
    document.getElementById('email').value =''
    document.getElementById('contact').value =''
    const li = `<li class="list-group-item" id='${users._id}'>${users.username} : ${users.email} <button class="btn btn-success btn-sm" onclick=editinfo('${users.username}','${users.email}','${users.contactNo}','${users._id}')>Edit</button> <button class="btn btn-danger btn-sm" onclick=deleteinfo('${users._id}')>Delete</button></li>`
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
    axios.get("https://crudcrud.com/api/2f4646366ae84572b667c04f4fc81612/AppoinmentData")
    .then((response)=>{
        for(let i=0; i<response.data.length; i++){
            let key = response.data[i];
            showUserOnList(key)
        }
    })
    .catch((err)=>document.body.innerHTML +=`Error: ${err}`)
})
function editinfo(editNameInfo, editEmailInfo, editContactInfo,hashvalue){
    document.getElementById('username').value = editNameInfo;
    document.getElementById('email').value = editEmailInfo;
    document.getElementById('contact').value = editContactInfo;
    axios.put(`https://crudcrud.com/api/2f4646366ae84572b667c04f4fc81612/AppoinmentData/${hashvalue}`,
        {
            "username": `${editNameInfo}`,
            "email": `${editEmailInfo}`,
            "contactNo": `${editContactInfo}`
        }
    )
    .then((response)=>deleteinfo(hashvalue))
    .catch((err)=>document.body.innerHTML+=`Error: ${err}`)
}
function deleteinfo(delUserInfo){
    // console.log(delUserInfo)
    // localStorage.removeItem(delUserInfo);
    axios.delete(`https://crudcrud.com/api/2f4646366ae84572b667c04f4fc81612/AppoinmentData/${delUserInfo}`)
    .then((response)=>removeUserInfoFromScreen(delUserInfo))
    .catch((err)=>document.body.innerHTML+=`${err}`)
}
function removeUserInfoFromScreen(usr){
    const parentNode = document.getElementById('listofusers')
    const toBeDelete = document.getElementById(usr)
    if(toBeDelete){
        parentNode.removeChild(toBeDelete)
    }
}