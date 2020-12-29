// create a geocoder object to use geocode
var geocoder = new google.maps.Geocoder();

// Hide all the date and time checkbox inputs
$(".regular").hide();
$(".oneoff").hide();
$(".regular2").hide();
$(".oneoff2").hide();

// **************
// Add Trips Radio Buttons
// **************
// Select radio buttons
var myRadio = $('input[name="regular"]');
myRadio.click(function(){
    if($(this).is(':checked')){
        if($(this).val() == "Y"){// Regular Commute is selected
            $(".oneoff").hide();
            $(".regular").show();
        }else{// One-off Commute is selected
            $(".regular").hide();
            $(".oneoff").show();
        }
    }
});

// **************
// Edit Trips Radio Buttons
// **************
var myRadio = $('input[name="regular2"]');
myRadio.click(function(){
    if($(this).is(':checked')){
        if($(this).val() == "Y"){// Regular Commute is selected
            $(".oneoff2").hide();
            $(".regular2").show();
        }else{// One-off Commute is selected
            $(".regular2").hide();
            $(".oneoff2").show();
        }
    }
});

// Calendar
$('input[name="date"], input[name="date2"]').datepicker({
    numberOfMonths: 1,
    showAnim: "fadeIn",
    dateFormat: "D M d, yy",
    minDate: +1,
    maxDate: "+12M",
    showWeek: true
});
 var data, departureLongitude, departureLatitude, destinationLongitude, destinationLatitude;
 
// Click on Create Trip Button
$("#addtripform").submit(function(event){
    //prevent default php processing
    event.preventDefault();
    
    //collect user inputs
    data = $(this).serializeArray();
    //   console.log(data);
    
    getAddTripDepartureCoordinates();
});

// Store Departure Coordinates
function getAddTripDepartureCoordinates(){
    // get coordinates of departure
    geocoder.geocode({
        'address': $("#departure").val()
    }, 
    function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
            // console.log(results);
            
            // get latitude and logitude
            departureLongitude = results[0].geometry.location.lng();
            departureLatitude = results[0].geometry.location.lat();
            // add to data array
            data.push({name: 'departureLongitude', value: departureLongitude});
            data.push({name:'departureLatitude', value: departureLatitude});
            
            // console.log(data);
            
            // coordinates of destination
            getAddTripDestinationCoordinates();
        }else{
            // coordinates of destination with missing departure
            getAddTripDestinationCoordinates();
        }
    });
}

// Store Desitination Coordinates
function getAddTripDestinationCoordinates(){
    // get coordinates of departure
    geocoder.geocode({
        'address': $("#destination").val()
    }, 
    function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
            // console.log(results);
            
            // get latitude and logitude
            destinationLongitude = results[0].geometry.location.lng();
            destinationLatitude = results[0].geometry.location.lat();
            // add to data array
            data.push({name: 'destinationLongitude', value: destinationLongitude});
            data.push({name:'destinationLatitude', value: destinationLatitude});
            
            // console.log(data);
            
            // Submit trip details
            submitAddTripRequest();
        }else{
            // Submit trip details with missing Destination
            submitAddTripRequest();
        }
    });
}

// Submit trip details
function submitAddTripRequest(){
//send to addtrips.php using AJAX
    $.ajax({
        url: "addtrips.php",
        type: "POST",
        data: data,
        // AJAX Call successful
        success: function(returnedData){
            if(returnedData){
                $("#addtripmessage").html(returnedData);
            }else{
                // hide error message
                $("#addtripmessage").hide();
                // hide modal
                $("#addtripModal").modal('hide');
                // reset form
                $("#addtripform")[0].reset();
                // load trips
                getTrips();
            }
        },
        // AJAX Call fails: show error AJAX Call error
        error: function(){
          $("#addtripmessage").html(
              "<div class='alert alert-danger'>There was an error with the Add Trips AJAX Call. Please try again later</div>"
          );
        }
    });
}

// get trips
function getTrips(){
    
}