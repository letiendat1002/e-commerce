
function convertDate(date){
    var dateobj = new Date(date);
    var day = String(dateobj.getDate()).padStart(2, "0"); 
    var month = String(dateobj.getMonth() + 1).padStart(2, "0"); 
    var year = dateobj.getFullYear();
  
    var formattedDate = day + "-" + month + "-" + year; 
    return (formattedDate)
  }
  
  export default convertDate