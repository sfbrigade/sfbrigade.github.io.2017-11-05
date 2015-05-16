// catch the "ctrl" combination keydown
$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });
};

// put your data on the textarea and select all
var performCopy = function() {
    var textArea = $("#textArea1");
    textArea.text('PUT THE TEXT TO COPY HERE. CAN BE A FUNCTION.');
    textArea[0].focus();
    textArea[0].select();
};

// bind CTRL + C
$.ctrl('C'.charCodeAt(0), performCopy);