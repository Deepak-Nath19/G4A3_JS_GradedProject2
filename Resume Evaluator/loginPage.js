window.onload = () => {
	localStorage.setItem('username', "deepak");
	localStorage.setItem('password', 'qwerty');
}

let username, password;

document.querySelector('#username').addEventListener('input', function () {
	username = this.value;
});

document.querySelector('#password').addEventListener('input', function () {
	password = this.value;
});

document.querySelector('#login').addEventListener('submit', function (event) {
	let uname = localStorage.getItem('username');
	let pass = localStorage.getItem('password');

	if (!(uname === username && pass === password)) {
		event.preventDefault();
		document.querySelector('#error-text').style.display = 'block';
		document.querySelector('#error-text').innerHTML = "Invalid username or password";
	}
});

