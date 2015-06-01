$(document).ready(function() {
    var request;    
    
    $("#happyForm").submit(function(event) {
        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request
        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzamyed1-s4H_SANrL83v12Fo5yl61AOgU-47J_P201gEe824vS/exec",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            // Log a message to the console
            console.log("Hooray, it worked!");
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
            document.location = "./thankyou.html"; // Other page in same directory
        });

        // Prevent default posting of form
        event.preventDefault();
        });
});

//function createRecord() {

    //var happiness = $("input[name=happiness]:checked").val();
    //var zipcode = $("input[name=zip]").val();
    
    //var gender = $("input[name=gender]").val();
    //var commute = $("input[name=commute]:checked").val();
    //if (typeof commute === "undefined") {
    //    commmute = "did not disclose";
    //}
    //var housing = $("input[name=housing]:checked").val();
    //if (typeof housing === "undefined") {
    //    housing = "did not disclose";
    //}    
    //var age = $("input[name=age]:checked").val();
    //if (typeof age === "undefined") {
    //    age = "did not disclose";
    //}    
    //alert(happiness);
    //alert(zipcode);
    //alert(housing);
    //var item = {"record":[
    //    {"happiness":happiness, "zipcode":zipcode, "gender":gender, "commute":commute, "housing":housing, "age":age}
    //]};
    //df.apis.db.createRecords({"table_name":"happiness", "body":item}, function (response) {
        
    //});
//}
