import throttle from 'lodash.throttle';

const LOCALESTORAGE_KEY = 'feedback-form-state';

const ref = {
  emailField: document.querySelector('input'),
  messageField: document.querySelector('textarea'),
  forms: document.querySelector('.feedback-form'),
};

ref.emailField.addEventListener('input', throttle(setLocalStorage, 500));
ref.messageField.addEventListener('input', throttle(setLocalStorage, 500));

ref.forms.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!ref.emailField.value || !ref.messageField.value) {
    return;
  }

  localStorage.removeItem(LOCALESTORAGE_KEY);

  console.log({
    email: ref.emailField.value,
    message: ref.messageField.value,
  });

  ref.emailField.value = '';
  ref.messageField.value = '';
});

function setLocalStorage() {
  localStorage.setItem(
    LOCALESTORAGE_KEY,
    JSON.stringify({
      email: ref.emailField.value,
      message: ref.messageField.value,
    })
  );
}

const savedState = localStorage.getItem(LOCALESTORAGE_KEY);
if (savedState) {
  const state = JSON.parse(savedState);
  ref.emailField.value = state.email;
  ref.messageField.value = state.message;
}
