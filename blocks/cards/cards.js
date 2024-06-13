import { createOptimizedPicture } from '../../scripts/aem.js';

function decorateTags(div) {
  [...div.children].forEach((child) => {
    const regex = /\[([^\]]+)]/;
    const content = child.textContent;

    const match = content.match(regex);

    if (match) {
      child.classList.add('card-tag-wrapper');

      const span = document.createElement('span');
      span.textContent = match[1].toString();
      span.classList.add('card-tag');

      child.textContent = '';

      child.appendChild(span);
    }
  });
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        decorateTags(div);
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
