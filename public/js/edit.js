const postId = document.querySelector('input[name="post-id"]').value;

const editPostLogic = async (event) => {

    const titleElem = document.querySelector('#title');
    const contentElem = document.querySelector('#body');

    try {
        await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: titleElem.value,
                content: contentElem.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (error) {
        console.error('There was an error updating the post');
        throw error;
    }
};

const deletePostLogic = async (event) => {

    try {
        await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
        });

        document.location.replace('/dashboard');
    } catch (error) {
        console.error('There was an error updating the post');
        throw error;
    }
};

document.querySelector('#edit-post').addEventListener('submit', editPostLogic);
document.querySelector('#delete-btn').addEventListener('click', deletePostLogic);
