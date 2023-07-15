const newPostLogic = async (event) => {
    event.preventDefault();

    const titleElem = document.querySelector('input[name="post-title"]').value;
    const contentElem = document.querySelector('textarea[name="post-body"]').value;

    try {
        await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                titleElem,
                contentElem,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (error) {
        console.error('There was an error creating the post');
        
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostLogic);
