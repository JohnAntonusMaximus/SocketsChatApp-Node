var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

socket.on('connect',function(){
    console.log('Connected to server!');
});

socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp);
    $messages = jQuery('.messages');
    console.log('New Message: ');
    console.log(message.text);
    
    $messages.append('<p><strong>'+ message.name + ' ' + momentTimestamp.local().format('h:mm a') + ':</strong> ' + message.text +'</p>');
    $messages.append('<p><strong>'+ momentTimestamp.local().format('h:mm a') + ':</strong> ' + '<em>'+ name + ' just joined ' + room +'</em>.</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit',function(event){
    event.preventDefault();  // Keeps page from refreshing on submit
    
    var $message = $form.find('input[name="message"]');
    
    socket.emit('message', {
        text: $message.val(),
        name: name
    });
    
    $message.val("");
    
    // Erase contents of input
});