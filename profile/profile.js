// AJAX Call to updateusername.php
$("#updateusernameform").submit(function(event){
  //prevent default php processing
  event.preventDefault();

  //collect user inputs
  var datatopost = $(this).serializeArray();
  // console.log(datatopost);

  //send them to signup.php using AJAX
  $.ajax({
    url: "profile/updateusername.php",
    type: "POST",
    data: datatopost,
    // AJAX Call successful
    success: function(data){
      if(data){
        $("#updateUsernameMessage").html(data);
      }else{
          location.reload();
      }
    },
    // AJAX Call fails: show error AJAX Call error
    error: function(){
      $("#updateUsernameMessage").html("<div class='alert alert-danger'>There was an error with the update username AJAX Call. Please try again later</div>");
    }
  });
});

// AJAX Call to updatepassword.php
$("#updatepasswordform").submit(function(event){
  //prevent default php processing
  event.preventDefault();

  //collect user inputs
  var datatopost = $(this).serializeArray();
  // console.log(datatopost);

  //send them to signup.php using AJAX
  $.ajax({
    url: "profile/updatepassword.php",
    type: "POST",
    data: datatopost,
    // AJAX Call successful
    success: function(data){
      if(data){
        $("#updatePasswordMessage").html(data);
      }
    },
    // AJAX Call fails: show error AJAX Call error
    error: function(){
      $("#updatePasswordMessage").html("<div class='alert alert-danger'>There was an error with the update username AJAX Call. Please try again later</div>");
    }
  });
});

// AJAX Call to updateemail.php
$("#updateemailform").submit(function(event){
  //prevent default php processing
  event.preventDefault();

  //collect user inputs
  var datatopost = $(this).serializeArray();
  // console.log(datatopost);

  //send them to signup.php using AJAX
  $.ajax({
    url: "profile/updateemail.php",
    type: "POST",
    data: datatopost,
    // AJAX Call successful
    success: function(data){
      if(data){
        $("#updateEmailMessage").html(data);
      }
    },
    // AJAX Call fails: show error AJAX Call error
    error: function(){
      $("#updateEmailMessage").html("<div class='alert alert-danger'>There was an error with the update username AJAX Call. Please try again later</div>");
    }
  });
});

// update profile picture preview
var file, imageType, imageSize, wrongType, reader;
$("#picture").change(function(){
    file = this.files[0];
    console.log(file);
    imageType = file.type;
    imageSize = file.size;
    
    // check acceptable file types
    var acceptableTypes = ["image/jpeg", "image/png", "image/jpg"];
    wrongType = ($.inArray(imageType, acceptableTypes) == -1);
    
    if(wrongType){
        $("#updatePictureMessage").html(
            "<div class='alert alert-danger'>Only jpeg, png, and jpg images are accepted</div>"
        );
        return false;
    }
    
    // check image size, larger than 3 MB
    if(imageSize > 3*1024*1024){
        $("#updatePictureMessage").html(
            "<div class='alert alert-danger'>Please upload an image less than 300 MB</div>"
        );
        return false;
    }
    
    // the FileReader object converts image to binary string
    reader = new FileReader();
    // callback
    reader.onload = updatePreview;
    // start the read operation -> convert content into data URL which is passed to the callback function
    reader.readAsDataURL(file);
});

// update profile picutre to user selected
function updatePreview(event){
    // console.log(event);
    $("#preview2").attr("src", event.target.result);
}