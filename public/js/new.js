const newPostLogic = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[id="post-title"]').value;
    const body = document.querySelector('textarea[id="post-body"]').value;

    try {
        await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                body,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (error) {
        console.error('There was an error creating the post');
        
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostLogic);
