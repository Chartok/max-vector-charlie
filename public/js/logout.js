const logoutLogic = async () => {
    try {
        const logoutResponse = await fetch('/api/users/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (logoutResponse.ok) {
            document.location.replace('/');
        } else {
            alert('Logout failed');
        }
    } catch (error) {
        console.error('There was an error logging out');
        
    }
}

document.querySelector('#logout-btn').addEventListener('click', logoutLogic);
