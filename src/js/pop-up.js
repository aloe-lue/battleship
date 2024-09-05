const TopNotification = ({ parent }) => {
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const button = document.createElement('button');
  const parentEl = document.querySelector(`${parent}`);

  button.innerText = 'Restart';

  div.classList.add('announce-winner');
  div.appendChild(h2);
  div.appendChild(button);
  parentEl.appendChild(div);
  return { div, h2, button, parentEl };
};

export default TopNotification;
