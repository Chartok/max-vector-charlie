const newPostLogic = async (event) => {
    event.preventDefault();

    const titleElem = document.querySelector('#title');
    const contentElem = document.querySelector('#body');

    try {
        await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: titleElem.value,
                body: contentElem.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (error) {
        console.error('There was an error creating the post');
        
    }
};

document.querySelector('#new-post').addEventListener('submit', newPostLogic);
