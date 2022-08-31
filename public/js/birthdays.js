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
    console.log(res,data);
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
        if( tempDate.getMonth() === today.getMonth() && tempDate.getDate() > today.getDate())
            return true
    })
    console.log(res);
    return res;
}

async function renderDates(list,flag){

    console.log(list.length);
    if(list.length === 0) {
        if(flag === 'today') {
            document.querySelector("#today span").innerHTML = '<span class="no_wish">No more wishes</span>'
            document.querySelector("#today .no_event").style.display = 'block'
        }
        if(flag === 'week')  {
            document.querySelector("#this_week span").innerHTML = '<span class="no_wish">No wishes for this week</span>'
            document.querySelector("#this_week .no_event").style.display = 'block'
        }
        if(flag === 'month') {
            document.querySelector("#this_month span").innerHTML = '<span class="no_wish">No wishes for this month<span>'
            document.querySelector("#this_month .no_event").style.display = 'block'
        }
    }
    for(let i of list){
        const li = document.createElement('li')
        li.innerHTML = `<span>${i.name}</span>`+ `<span><span class="birthdate">${new Date(i.birthdate).getDate()}</span>`+
        `<span> <i class="fa fa-pencil fnt_awes" onclick = "updateData('${i._id}','${i.name}','${i.birthdate}')" aria-hidden="true"></i>` + 
        `<i class="fa fa-trash fnt_awes" onclick = "deleteData('${i._id}')" aria-hidden="true"></i></span></span>`;
        if(flag === 'today') { 
            document.querySelector("#today ul").appendChild(li)
            document.querySelector("#today .no_event").style.display = 'none'
        }
        if(flag === 'week') {
            document.querySelector("#this_week ul").appendChild(li)
            document.querySelector("#this_week .no_event").style.display = 'none'
        }
        if(flag === 'month') {
            document.querySelector("#this_month ul").appendChild(li)
            document.querySelector("#this_month .no_event").style.display = 'none'
        }
    }
}


const updateData = (id,name,birthdate) => {
    console.log(id,name,birthdate);
    birthdate = new Date(birthdate)

    document.querySelector("#addNew").classList.add("inactive");
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

document.getElementsByClassName('addbtn')[0].addEventListener('click',()=>{
        document.querySelector("#update").classList.add("inactive");
        document.querySelector("#addNew").classList.remove("inactive");
        document.querySelector("#addNew").style.display = "flex";
})


function getAllbirthdaysPage(){
    location.href = '/allbirthdays'
}

