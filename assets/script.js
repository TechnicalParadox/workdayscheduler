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

/** Loads all event descriptions from localStorage */
function loadDescs()
{
  for (let t = 0900; t <= 1700; t+=100)
  {
    let fh = t.toString().padStart(4, "0")
    let tb = $("#"+fh);
    let desc = tb.children(".description");

    desc.empty();
    desc.append($("<p>").addClass("h-100 w-100").html(localStorage.getItem(fh)));
  }
}

/**
 * Save the description of the event with the passed ID
 * @param  {[type]} id the ID of the event to save
 */
function saveDesc(id)
{
  let tb = $("#"+id);
  let desc = tb.children(".description").children("p").html();

  localStorage.setItem(id, desc);
}

/** Saves event description on click of save button */
$(".saveBtn").click(function()
{
  let id = $(this).parent().attr('id');
  saveDesc(id);
});

$(".description").on("click", "p", function()
{
  let desc = $(this).html();
  let ta = $("<textarea>").addClass("h-100 w-100").val(desc);
  $(this).parent().append(ta);
  $(this).remove();
  ta.trigger("focus");
});

$(".description").on("blur", "textarea", function()
{
  let desc = $(this).val();
  $(this).parent().append($("<p>").addClass("h-100 w-100").html(desc));
  $(this).remove();
});

loadDescs(); // load event descriptions
