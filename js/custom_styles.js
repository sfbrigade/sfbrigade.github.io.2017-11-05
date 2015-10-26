//set square logo heigts to the size of tallest rectangular logo

$(window).ready(setSquareLogoHeight());

$(window).resize(function(){
    setSquareLogoHeight();
});

function setSquareLogoHeight() {
    $(".square-logo").height($("#tallest-logo").height());
};

