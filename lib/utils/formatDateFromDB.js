const formatDateFromDB = (DB_date) => {

  const date = DB_date.split('T')[0];
  let time = DB_date.split("T")[1].substring(0, 5).split(':');

  let hour = time[0];
  let minute = time[1];

  if(hour > 13){
    hour -= 12
    time = hour + ':' + minute + 'PM'
  } else {
    time = hour + ':' + minute + 'AM'
  }

  let dates = date.split('-');
  const date_format = dates[1] + '/' + dates[2] + '/' + dates[0].substring(2, 4);

  return date_format + ' ' + time

}

export default formatDateFromDB;
