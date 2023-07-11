const commentLogic = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const commentElem = document.querySelector('#comment-body');

    try {
        if (commentElem.value) {
            await fetch(`/api/comment`, {
                method: 'POST',
                body: JSON.stringify({
                    postId:
                        postId,
                    comment: commentElem.value,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            document.location.reload();
        }

    } catch (error) {
        console.error('There was an error creating the comment');
        throw error;
    }
};

document.querySelector('#comment-form').addEventListener('submit', commentLogic);
