$(document).ready(function () {
    // Display the current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Generate timeblocks
    var timeblocksContainer = $(".container");
  
    for (var i = 9; i <= 17; i++) {
      var timeblock = $("<div>").addClass("row time-block");
      timeblock.attr("data-hour", i);
  
      var hourCol = $("<div>")
        .addClass("col-md-1 hour")
        .text(dayjs().hour(i).format("hA"));
  
      var textareaCol = $("<textarea>")
        .addClass("col-md-10 description")
        .attr("id", "event-" + i);
  
      // Check and apply past, present, or future class
      if (i < dayjs().hour()) {
        textareaCol.addClass("past");
      } else if (i === dayjs().hour()) {
        textareaCol.addClass("present");
      } else {
        textareaCol.addClass("future");
      }
  
      var saveBtnCol = $("<button>")
        .addClass("col-md-1 saveBtn")
        .html('<i class="fas fa-save"></i>');
  
      timeblock.append(hourCol, textareaCol, saveBtnCol);
      timeblocksContainer.append(timeblock);
    }
  
    // Load events from local storage
    loadEvents();
  
    // Save event when save button is clicked
    $(".saveBtn").on("click", function () {
      var hour = $(this).parent().data("hour");
      var eventInput = $("#event-" + hour).val().trim();
  
      if (eventInput !== "") {
        localStorage.setItem("event-" + hour, eventInput);
        alert("Event saved!");
      } else {
        alert("Please enter an event before saving.");
      }
    });
  });
  
  function loadEvents() {
    for (var i = 9; i <= 17; i++) {
      var savedEvent = localStorage.getItem("event-" + i);
      if (savedEvent) {
        $("#event-" + i).val(savedEvent);
      }
    }
  }
  