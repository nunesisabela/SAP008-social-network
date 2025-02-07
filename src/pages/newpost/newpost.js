import { create, auth } from '../../lib/auth.js';

// eslint-disable-next-line consistent-return
export default () => {
  if (!auth.currentUser) {
    window.location.hash = '#entrar';
  } else {
    const container = document.createElement('div');
    const template = `<link rel="stylesheet" href="style_new_post.css" />
    <section class="container home">
      <nav class="web-icons-container">
        <img id="plate-icon" data-action="plate" class="icons-size" src="./external/svg/logo.svg"/>
        <img id="home-icon" data-action="home" class="icons-size" src="./external/svg/home-icon.svg"/>
        <img id="menu-icon" data-action="menu" class="icons-size" src="./external/svg/menu-icon.svg"/>
        <img id="logout-icon" data-action="logout" class="icons-size" src="./external/svg/log-out-icon.svg"/>
        <a href="#novo_post"><img id="plus-icon" class="icons-size" src="./external/svg/plus-icon.svg"/></a>
        <img id="up-icon" data-action="up" class="icons-size" src="./external/svg/chevron-up-icon.svg"/>
      </nav>

      <nav id="mobile-top-icons" class="icons-container">
        <img id="menu-icon" data-action="menu" class="icons-size" src="./external/svg/menu-icon.svg"/>
        <img id="home-icon" data-action="home" class="icons-size" src="./external/svg/home-icon.svg"/>
        <img id="logout-icon" data-action="logout" class="icons-size" src="./external/svg/log-out-icon.svg"/>
      </nav>

      <p>Olá, ${auth.currentUser.displayName}! Qual sua nova crítica?</p>
      <form class="evaluation-inputs" style="display: flex; flex-direction: column;">
        <input id="local" type="text" placeholder="Nome do restaurante" />

        <input id="adress" type="text" placeholder="Endereço do restaurante" />

        <textarea id="review" placeholder="Escreva sua crítica"></textarea>
        
        <button data-action="publish" class="cancel-btn-new-post">Publicar</button>
        <button data-action="cancel" class="post-btn-new-post">Cancelar</button>
      </form>

      <nav id="mobile-footer-icons" class="icons-container">
        <a href="#novo_post"><img id="plus-icon" class="icons-size" src="./external/svg/plus-icon.svg"/></a>
        <img id="plate-icon" data-action="plate" class="icons-size" src="./external/svg/logo.svg"/>
        <img id="up-icon" data-action="up" class="icons-size" src="./external/svg/chevron-up-icon.svg"/>
      </nav>
    </section>`;
    container.innerHTML = template;

    const newPost = container.querySelector('.container');
    newPost.addEventListener('click', (event) => {
      event.preventDefault();
      const newElement = event.target;
      const actions = newElement.dataset.action;
      const local = container.querySelector('#local');
      const adress = container.querySelector('#adress');
      const review = container.querySelector('#review');

      switch (actions) {
        case 'publish':
          create(local.value, adress.value, review.value).then(() => {
            window.location.hash = '#home';
          });
          break;
        case 'cancel':
          window.location.hash = '#home';
          break;
        default:
          // console.log();
      }
    });

    return container;
  }
};
// const publishBtn = container.querySelector('.post-btn-new-post');
// const cancelPost = container.querySelector('.cancel-btn-new-post');

// publishBtn.addEventListener('click', () => {
// create(local.value, adress.value, review.value);
// window.location.hash = '#home';
// });

// cancelPost.addEventListener('click', () => {
// window.location.hash = '#home';
// });
