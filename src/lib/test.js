console.log('This is test.js');

window.onload = function () {
  const box = document.getElementsByTagName('div')[0];
  const div = document.createElement('div');
  div.innerHTML = '<p>HEY!</p>';
  div.className = 'box';
  box.appendChild(div);
};
