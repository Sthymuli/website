// Slides the black pill of the main menu under the hovered or focused link.
// It rests on the current page's link, or hides when no menu item is current.
(function () {
  var menu = document.querySelector('.menu');
  var pill = menu && menu.querySelector('.menu-pill');
  if (!pill) return;
  var links = menu.querySelectorAll('a');
  var rest = menu.querySelector('a[aria-current="page"]');
  var current = null;

  function move(link, instant) {
    if (current) current.classList.remove('on-pill');
    if (!current) instant = true; // appear in place rather than slide in from nowhere
    current = link;
    pill.style.opacity = link ? '' : '0';
    if (!link) return;
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
  window.addEventListener('resize', function () { move(current, true); });

  document.documentElement.classList.add('has-pill');
  move(rest, true);
})();
