const commentBtn = document.querySelector('.comment__wrapper-btn');
const commentMsg = document.querySelector('.submitted__comment-message');
const commentInput = document.querySelector('.comment__wrapper-input');

commentBtn.addEventListener('click', () => {
    if (commentInput.value === '') {
        commentInput.classList.add('error');
    } else {
        commentInput.value = '';
        commentInput.classList.remove('error');
        commentMsg.classList.add('showMsg');

        setTimeout(() => {
            commentMsg.classList.remove('showMsg');
        }, 3000);
    }
})



const startButton = document.getElementById('startButton');
const loader = document.getElementById('loader');
const errorText = document.querySelector('.error__occurred');

startButton.addEventListener('click', () => {
    loader.classList.add('showLoader');

    setTimeout(() => {
        loader.classList.remove('showLoader');
        errorText.style.display = 'block';
    }, 4000);

    setTimeout(() => {
        errorText.style.display = 'none';
    }, 1000);
});