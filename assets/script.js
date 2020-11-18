// Start Time Tracking
var hour;

function updateHour()
{
  hour = moment().hour(); // Get current local hour
  let mt = (hour.toString().padStart(2,"0")).toString().padEnd(4,"0"); // format hour to military time
  colorSchedule(mt); // Call colorSchedule with current formatted hour
  setTimeout(function(){updateHour;},(60-moment().minutes())*60*1000); // Set timeout for next hour update
}

updateHour();
// End Time Tracking

/** Sets the background color of all the timeblock descriptions */
function colorSchedule(mt)
{
  for (let t = 0900; t <= 1700; t+=100) // loop from 0900 -> 1700 hours every 0100
  {
    let dif = (t-mt) // difference in time between looped hour and current hour

    let tb = $("#"+t.toString().padStart(4,"0")) // query for timeblock id
    let desc = tb.children(".description"); // get event description child

    desc.removeClass("past present future"); // remove potential previous coloring

    if (dif == 0) // Current hour color
      desc.addClass("present");
    else if (dif < 0) // Past color
      desc.addClass("past");
    else if (dif > 0) // Future color
      desc.addClass("future");
  }
}

function loadDescs()
{
  for (let t = 0900; t <= 1700; t+=100)
  {
    let fh = t.toString().padStart(4, "0")
    let tb = $("#"+fh);
    let desc = tb.children(".description");

    desc.append($("<p>").html(localStorage.getItem(fh)));
  }
}

function saveDescs()
{
  for (let t = 0900; t <= 1700; t+=100)
  {
    let fh = t.toString().padStart(4, "0")
    let tb = $("#"+fh);
    let desc = tb.children(".description").children("p").html();

    localStorage.setItem(fh, desc);
  }
}

// TODO: Save button on click

// TODO: description on click

loadDescs();
