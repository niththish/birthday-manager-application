const logout = () => {
    localStorage.removeItem('authorization')
    location.href = '/'
}

const getBirthdayDetails = async() => {
    try{
        const response = await axios.get('/api/birthdays',{ headers : {'authorization' : localStorage.getItem('authorization')} })
        const data = response.data.data;
        sortByName(data)

        const searchbar = document.getElementsByClassName('searchbar')[0];
        
        let cmpString = ''
        searchbar.addEventListener('keyup',(e)=>{
            if(e.keyCode >= 65 && e.keyCode <= 90){
                cmpString = String.fromCharCode(e.keyCode+32)
                filteredData = data.filter((data)=> data.name.startsWith(cmpString))
                renderDates(filteredData)
            }
            else if(e.keyCode === 8) renderDates(data)
        })
        renderDates(data);
        console.log(data);
    }catch(err){

    }
}
getBirthdayDetails();


const getbirthdaysPage = () => {
    location.href = '/birthdays'
}


async function renderDates(list){

    document.querySelector("section ul").innerHTML = "";

    for(let i of list){
        const li = document.createElement('li')
        li.innerHTML = `<span>${i.name}</span>`+ `<span><span class="birthdate">${new Date(i.birthdate).toLocaleString('default', { day : "numeric", month: 'short' })}</span>`+
        `<span> <i class="fa fa-pencil fnt_awes" onclick = "updateData('${i._id}','${i.name}','${i.birthdate}')" aria-hidden="true"></i>` + 
        `<i class="fa fa-trash fnt_awes" onclick = "deleteData('${i._id}')" aria-hidden="true"></i></span></span>`;
        document.querySelector("ul").appendChild(li)
    }
}


const sortByName = (data) => {
    data.sort((a,b) => {
        if( new Date(a.birthdate).getMonth() === new Date(b.birthdate).getMonth() ){
            if( new Date(a.birthdate).getDate() > new Date(b.birthdate).getDate() ) return 1
            return -1
        }
        if( new Date(a.birthdate).getMonth() > new Date(b.birthdate).getMonth() ) return 1;
        return -1;
    })
    console.log(data);
}


const updateData = (id,name,birthdate) => {
    console.log(id,name,birthdate);
    birthdate = new Date(birthdate)

    document.querySelector("#update").classList.remove("inactive");

    document.querySelector("#update").style.display = "flex";
    
    const inputFields = document.querySelectorAll("#update input");
    inputFields[0].value = name;
    inputFields[1].value = `${birthdate.getFullYear()}-${birthdate.getMonth()+1 <= 9 ? "0"+(birthdate.getMonth()+1) : birthdate.getMonth()+1}-${birthdate.getDate()}`

    document.querySelector("#update button").addEventListener('click',async()=>{
        const data = {
            name : inputFields[0].value,
            birthdate : inputFields[1].value
        }
        const response = await axios.patch(`/api/birthdays/${id}`,data,{ headers : {'authorization' : localStorage.getItem('authorization')} })
        console.log(response);
        getBirthdayDetails();

        document.querySelector("#update").classList.add("inactive");
    

        
    });
}

const deleteData = async(id) => {
    console.log(id);
    const response = await axios.delete(`/api/birthdays/${id}`,{ headers : {'authorization' : localStorage.getItem('authorization')} })
    console.log(response);
    getBirthdayDetails();
}