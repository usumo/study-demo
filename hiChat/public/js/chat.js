let nickname = '';

var socket = io();

function send() {
	if (!nickname) {
		const name = prompt('请输入昵称！');
		if (name) {
			nickname = name;
			socket.emit('add user', {
				nickname: name
			});
		}
	} else {
		var value = $.trim($('#ipt').val());
		if (value == '') {
			return;
		}
		socket.emit('new message', {
			nickname,
			value
		});
		$('#messages').append($('<li>').text(value));
		$('#ipt').val('');
	}
}
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		send();
	}
});
$('#send').on('click', function () {
	send();
});
socket.on('new message', function (data) {
	$('#messages').append($('<li>').text(`${data.nickname}：${data.message}`));
});
socket.on('user joined', function (data) {
	$('#messages').append($('<li>').text(data.nickname));
});