import axios from "axios";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconsSvgUrl from '../img/icons.svg';

const body = document.body;

const togetherHtml = `
    <div id="together-modal" class="together-modal">
        <div class="together-modal-content">
            <button class="together-modal-close">
                <svg class="together-modal-svg" width="24" height="24">
                    <use href="${iconsSvgUrl}#icon-x"></use>
                </svg>
            </button>
            <h3 class="together-modal-title">Thank you for your interest in cooperation!</h3>
            <p class="together-modal-text">The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.</p>
        </div>
    </div>
`;
body.insertAdjacentHTML('beforeend', togetherHtml);

const form = document.querySelector('.together-form');
const modal = document.getElementById('together-modal');
const closeButton = document.querySelector('.together-modal-close');

const errorText = document.querySelector('.together-text-error');
const errorInput = document.querySelector('.together-input-error');

const okIcon = document.querySelector('.together-icon-ok');
const okInput = document.querySelector('.together-input-ok');

const text = document.querySelector('.together-text');


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('.together-email').value;
    const comment = document.querySelector('.together-text').value;

    if (!email.match(/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        okIcon.style.display = 'none';
        errorText.style.display = 'block';
      iziToast.info({
        title: 'Hey!',
          message: 'Please enter a valid email address!',
        position: 'topCenter',
      });        
      return;
    }
    
    sendPost(email, comment);
});

function sendPost(email, comment) {
    const data = {
        email: email,
        comment: comment,
    };

    axios.post('https://portfolio-js.b.goit.study/api/requests', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
        .then(response => {
            if (response.data) {
                modal.style.display = 'flex';                
                form.reset();
          }        
        
      })
      .catch(error => {
        iziToast.error({
          title: 'Error',
          message: 'Failed to submit your request. Please try again later.',
          position: 'topCenter',
        });
      });
}

const email = document.querySelector('.together-email');
email.addEventListener('input', function(event) {
    const inputValue = event.target.value.trim();

    if (inputValue === '') {        
        okIcon.style.display = 'none';
        errorText.style.display = 'none';
    } else if (!inputValue.match(/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {        
        okIcon.style.display = 'none';
        errorText.style.display = 'block';
    } else {        
        okIcon.style.display = 'block';
        errorText.style.display = 'none';
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});

closeButton.addEventListener('click', () => {
 modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
     }
 });


