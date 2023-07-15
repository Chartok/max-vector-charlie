const loginLogic = async (event) => {
    event.preventDefault();

    const usrNameElem = document.querySelector('#username-login');
    const usrPwElem = document.querySelector('#password-login');

    try {
        const loginResponse = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: usrNameElem.value,
                password: usrPwElem.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (loginResponse.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('There was an error logging in');
        
    }
};

document.querySelector('#login-form').addEventListener('submit', loginLogic);
