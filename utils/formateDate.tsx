const formatDate = (dateObj ,withHours = false) => {
  console.log('->get' , dateObj)
  const  objDate = new Date(dateObj);
  const formatDate = {
    day: objDate.getDate(),
    month: objDate.getMonth() + 1,
    year: objDate.getFullYear(),
    hour: objDate.getHours()
  }
  if (formatDate.day < 10) {
    formatDate.day = `0${formatDate.day}`
  }
  if (formatDate.month < 10) {
    formatDate.month = `0${formatDate.month}`
  }
  if(withHours){
    return {date: `${formatDate.year}-${formatDate.month}-${formatDate.day}`, hour: formatDate.hour}
  }
  else{
    return `${formatDate.year}-${formatDate.month}-${formatDate.day}`
  }

}
export default formatDate
