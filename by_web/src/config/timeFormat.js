let today = new Date(); //获得当前日期
let year = today.getFullYear()+''; //获得年份
let month = today.getMonth() + 1; //此方法获得的月份是从0---11，所以要加1才是当前月份
let day = today.getDate()+''; //获得当前日期
if(day<10){
  day = '0'+day
}
if(month<10){
	month = "0"+month
}
export default {
	year,
	month,
  day,
}


