$(document).ready(function() {
$('.like').on('click', function(event){
	event.preventDefault();
$(this).text('Liked!');
});

$('.add-link').on('click', function(event){
	event.preventDefault();
$(this).closest('.body-top').find('.form').toggleClass('link');


});

});