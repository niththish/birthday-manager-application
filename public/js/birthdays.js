const getBirthdayDetails = async() => {
    try{
        const response = await axios.get('/api/birthdays',{ headers : {'authorization' : localStorage.getItem('authorization')} })
        const data = response.data.data;

        console.log(data);
        const todayList = getTodayList(data);
        const weekList = getWeekList(data);
        const monthList = getMonthList(data);

        document.querySelector("#today ul").innerHTML = "";
        document.querySelector("#this_week ul").innerHTML = "";
        document.querySelector("#this_month ul").innerHTML = "";

        renderDates(todayList,"today");
        renderDates(weekList,"week");
        renderDates(monthList,"month");
    }catch(err){

    }
}
getBirthdayDetails();

const logout = () => {
    localStorage.removeItem('authorization')
    location.href = '/'
}



function getTodayList(data){
    const res = data.filter((data) => {
        return new Date(data.birthdate).getDate() === new Date().getDate()
    })

    return res;
}

function getWeekList(data){
    const res = data.filter((data) => {
        const tempDate = new Date(data.birthdate);
        const today = new Date();
        if( tempDate.getMonth() === today.getMonth && (tempDate.getDate() >= today.getDate() && tempDate.getDate() < today.getDate()+7) )
            return true
    })
    return res;
}

function getMonthList(data){
    const res = data.filter((data) => {
        const tempDate = new Date(data.birthdate);
        const today = new Date();
        if( tempDate.getMonth() === today.getMonth())
            return true
    })
    console.log(res);
    return res;
}

async function renderDates(list,flag){
    
    for(let i of list){
        const li = document.createElement('li')
        li.innerHTML = `<span>${i.name}</span>`+ 
        `<span> <i class="fa fa-pencil fnt_awes" onclick = "updateData('${i._id}','${i.name}','${i.birthdate}')" aria-hidden="true"></i>` + 
        `<i class="fa fa-trash fnt_awes" onclick = "deleteData('${i._id}')" aria-hidden="true"></i></span`;
        if(flag === 'today') document.querySelector("#today ul").appendChild(li)
        if(flag === 'week') document.querySelector("#this_week ul").appendChild(li)
        if(flag === 'month') document.querySelector("#this_month ul").appendChild(li)
    }
}


const updateData = (id,name,birthdate) => {
    console.log(id,name,birthdate);
    birthdate = new Date(birthdate)
    document.querySelector("#addNew").classList.add("inactive");
    document.querySelector("#update").classList.remove("inactive");
    
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
        document.querySelector("#addNew").classList.remove("inactive");
    });
}

const deleteData = async(id) => {
    console.log(id);
    const response = await axios.delete(`/api/birthdays/${id}`,{ headers : {'authorization' : localStorage.getItem('authorization')} })
    console.log(response);
    getBirthdayDetails();
}


const insertBirthday = async() => {
    const inputFields = document.querySelectorAll("#addNew input");
    try{
        const data = {
            name : inputFields[0].value,
            birthdate : inputFields[1].value
        }
        const response = await axios.post('/api/birthdays',data,{ headers : {'authorization' : localStorage.getItem('authorization')} })
        console.log(response);
        getBirthdayDetails();
    }catch(err){

    }
}