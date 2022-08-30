const toggleForm = (e) => {
    if(e.innerText === 'login'){
        document.getElementById('signup').classList.add('inactive');
        document.getElementById('login').classList.remove('inactive');
        return;
    }
    document.getElementById('login').classList.add('inactive');
    document.getElementById('signup').classList.remove('inactive');
}

const login = async() => {
    const formData = document.querySelectorAll("#login input");
    const username = formData[0].value;
    const password = formData[1].value;
    const formId = "login";
    const validation = validateForm(username,password,formId);

    if(validation) await postLogin(username,password);
}

const signup = async() => {
    const formData = document.querySelectorAll("#signup input");
    const username = formData[0].value;
    const password = formData[1].value;
    const formId = "signup";
    const validation = validateForm(username,password,formId);

    if(validation) await postSignup(username,password);
}


function validateForm(username,password,formId){
    let status;
    if(formId === 'login') status = document.querySelector("#login p");
    else status = document.querySelector("#signup p");

    if(!username && !password){
        status.innerText = "provided username and password";
        status.style.display = "block";
        return false;
    }
    if(!username){
        status.innerText = "provide username";
        status.style.display = "block";
        return false;
    }
    if(!password){
        status.innerText = "provide password";
        status.style.display = "block";
        return false;
    }

    status.style.display = "none";
    return true;
}


const postLogin = async(username,password) => {
    try{
        const res = await axios.post('/auth/login',{ username : username, password : password })
        if(res.data.status === 'success'){
            storeToken(res.data.token);
            location.href = '/birthdays';
        }
        else console.log("invalid");
    }catch(err){
        console.log(err);
    }
}


const postSignup = async() => {
    try{
        const res = await axios.post('/auth/signup',{ username : username, password : password })
        if(res.data.status === 'success') console.log("success");
        else console.log("invalid");
    }catch(err){
        console.log(err);
    }
}


const storeToken = (token) => {
    localStorage.setItem('authorization',`Bearer ${token}`)
}



