function passParams(width, height){
    $.ajax({
      url: "https://localhost:8080/ImageMatch",
      type: "get", //send it through get method
      data: {
        Width: width,
        Height: height
      },
      success: function(response) {
        //Do Something
      },
      error: function(xhr) {
        //Do Something to handle error
      }
    });
}
