// Start Time Tracking
var hour;

/**
 * Updates the current hour, updates schedule colors.
 * @return {[type]} [description]
 */
function updateHour()
{
  hour = moment().hour();
  let mt = (hour.toString().padStart(2,"0")).toString().padEnd(4,"0");
  console.log(mt);
  colorSchedule(mt);
  setTimeout(function(){updateHour;},(60-moment().minutes())*60*1000);
}

updateHour();
// End Time Tracking

/** Sets the background color of all the timeblock descriptions */
function colorSchedule(mt)
{
  for (let t = 0900; t <= 1700; t+=100)
  {
    let dif = (t-mt)

    let tb = $("#"+t.toString().padStart(4,"0"))
    let desc = tb.children(".description");

    desc.removeClass("past present future");

    if (dif == 0) // Current hour
      desc.addClass("present");
    else if (dif < 0) // Past
      desc.addClass("past");
    else if (dif > 0) // Future
      desc.addClass("future");
  }
}

function loadDescs()
{

}

function saveDescs()
{
  
}
