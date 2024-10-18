
function submitLogin(event) {
    event.preventDefault();

    if(!validateUserName() || !validatePassword()){
        return;
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': ''
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let message = '';
        if (data.type == 'student') { 
            message = `Name(Thai) : ${data.displayname_th}
                    Name(English) : ${data.displayname_en}
                    Username : ${data.username}
                    Status : ${data.tu_status}
                    Status Id : ${data.statusid}
                    Email : ${data.email}
                    Faculty : ${data.faculty}
                    Department : ${data.department}
`;
        } else {
            message = `Name(Thai) : ${data.displayname_th}
                    Name(English) : ${data.displayname_en}
                    Username : ${data.username}
                    Status :  ${data.tu_status}
                    Status Employee : ${data.StatusEmp}
                    Email : ${data.email}
                    Department: ${data.department}
                    Organization: ${data.organization}
`;
        }
        document.getElementById('message').innerText = message;
        showPopup(message);
    })
    .catch(error => {
        let message = '';
        console.error('Error:', error);
        message = 'Invalid login, please try again.';
        document.getElementById('message').innerText = message;
        document.getElementById('message').style.color = "red";
        showPopup(message);
    });
}

function showPopup(message) {
    document.getElementById('message').innerText = message;
    document.getElementById('popupOverlay').classList.add('visible');
    document.getElementById('popup').classList.add('visible');
}
function closePopup() {
    document.getElementById('popupOverlay').classList.remove('visible');
    document.getElementById('popup').classList.remove('visible');
}
function validateUserName(){
    const usernameInput = document.getElementById('username');
    const errorElement = document.getElementById('usernameError');

    if(usernameInput.value == ""){
        errorElement.textContent ="Please enter your Username ";
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }

}

function validatePassword(){
    const passwordInput = document.getElementById('password');
    const errorElement = document.getElementById('passwordError');

    if(passwordInput.value == ""){
        errorElement.textContent ="Please enter your Password.";
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }

}