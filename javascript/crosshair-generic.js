// additional functionality to the crosshair-generator provided by miro / ananassi 

function triggerNotification(event) {
    var notificationBox = $('.notification-box');

    $('.notification-text').text(event.message);

    if (event.type === 'error') {
        notificationBox.addClass('error');
    } else {
        notificationBox.removeClass('error');
    }
    
    showNotification();

    // after interval, hide the notification
    setTimeout(function() {
        hideNotification();
    }, 3000);
};

function hideNotification() {
    $('.notification-box').css('opacity', 0);

    setTimeout(function() {
        $('.notification-box').css('display', 'none');
    }, 100);
};

function showNotification() {
    var self = this;
    $('.notification-box').css('display', 'block');


    setTimeout(function() {
        $('.notification-box').css('opacity', 1);
    }, 30); // hack to allow the fade in to happen
};

// Bind the "click to hide" -function to notification box
$(document).ready(function() {
	$('.notification-box').click(function() {
		hideNotification();
	});
});
