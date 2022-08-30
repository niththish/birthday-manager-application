const getBirthdayDetails = async() => {
    try{
        const data = await axios.get('/api/birthdays',{ headers : {'authorization' : localStorage.getItem('authorization')} })
        console.log(data.data.data);
        return data.data.data;
    }catch(err){

    }
}

let data;
getBirthdayDetails().then((data) => data = data)
console.log(data);
