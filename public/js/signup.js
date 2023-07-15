const signupLogic = async (event) => {
    event.preventDefault();

    const usrNameElem = document.querySelector('#username-input-signup');
    const usrPwElem = document.querySelector('#password-input-signup');

    try {
        const signupResponse = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username: usrNameElem.value,
                password: usrPwElem.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (signupResponse.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Signup failed');
        }
    } catch (error) {
        console.error('There was an error signing up');
        console.log(signupResponse);
        
    }
};

document.querySelector('#signup').addEventListener('submit', signupLogic);
