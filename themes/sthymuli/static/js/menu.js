// Slides the black pill of the main menu under the hovered or focused link.
// It rests on the "cta" item (Get in touch) when the pointer leaves the menu.
(function () {
  var menu = document.querySelector('.menu');
  var pill = menu && menu.querySelector('.menu-pill');
  if (!pill) return;
  var links = menu.querySelectorAll('a');
  var rest = menu.querySelector('a.cta') || links[0];
  var current = null;

  function move(link, instant) {
    if (current) current.classList.remove('on-pill');
    current = link;
    link.classList.add('on-pill');
    if (instant) pill.style.transition = 'none';
    pill.style.width = link.offsetWidth + 'px';
    pill.style.height = link.offsetHeight + 'px';
    pill.style.transform = 'translate(' + link.offsetLeft + 'px,' + link.offsetTop + 'px)';
    if (instant) {
      pill.getBoundingClientRect(); // apply the jump before restoring the transition
      pill.style.transition = '';
    }
  }

  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener('mouseenter', function () { move(a); });
    a.addEventListener('focus', function () { move(a); });
  });
  menu.addEventListener('mouseleave', function () { move(rest); });
  menu.addEventListener('focusout', function (e) {
    if (!menu.contains(e.relatedTarget)) move(rest);
  });
  window.addEventListener('resize', function () { move(current || rest, true); });

  document.documentElement.classList.add('has-pill');
  move(rest, true);
})();
