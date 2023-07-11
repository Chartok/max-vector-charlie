const signupLogic = async (event) => {
    event.preventDefault();

    const usrNameElem = document.querySelector('#username-signup');
    const usrPwElem = document.querySelector('#password-signup');

    try {
        const signupResponse = await fetch('/api/users/signup', {
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
        throw error;
    }
};

document.querySelector('#signup').addEventListener('submit', signupLogic);
