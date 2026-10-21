// Keeps the home heading off the robot in the background photo.
// The robot is the `keepout` circle from content/_index.md. The script works out where
// `background-size: cover` puts it on this screen, then places the heading beside it
// (as in the mockup) or, when there is no room, above or below it, shrinking the
// heading only if it would not fit otherwise.
(function () {
  var hero = document.querySelector('.hero[data-keepout][data-background]');
  if (!hero) return;
  var text = hero.querySelector('.hero-text');
  var header = document.querySelector('.site-header');
  var k = hero.dataset.keepout.split(',').map(Number);
  var img = new Image();

  function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }

  // Largest font size (px) at which a box of bw x bh em fits in aw x ah px.
  function fit(want, bw, bh, aw, ah) { return Math.min(want, aw / bw, ah / bh); }

  function layout() {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (!iw) return;
    hero.classList.remove('is-placed');
    text.style.cssText = '';
    hero.style.backgroundPosition = '';

    var css = getComputedStyle(hero);
    var W = hero.clientWidth, H = hero.clientHeight;
    var padL = parseFloat(css.paddingLeft), padR = parseFloat(css.paddingRight), padB = parseFloat(css.paddingBottom);
    var top = header ? header.offsetTop + header.offsetHeight : 0;
    var want = parseFloat(getComputedStyle(text).fontSize);

    // Size of the heading in em, measured at its natural width.
    hero.classList.add('is-placed');
    var bw = text.offsetWidth / want, bh = text.offsetHeight / want;

    // Photo scale under background-size: cover, and the keep-out radius with its margin.
    var s = Math.max(W / iw, H / ih);
    var r = k[2] * iw * s;
    var R = r + Math.max(24, r * 0.15);
    var gap = 16;

    // Places the photo so the robot centre lands as close as possible to (cx, cy).
    function place(cx, cy) {
      var ox = clamp(cx - k[0] * iw * s, W - iw * s, 0);
      var oy = clamp(cy - k[1] * ih * s, H - ih * s, 0);
      return { ox: ox, oy: oy, cx: ox + k[0] * iw * s, cy: oy + k[1] * ih * s };
    }

    // Beside: photo centred as in the mockup, robot kept below the header.
    var side = place(W / 2 + (k[0] - 0.5) * iw * s, Math.max(H / 2 + (k[1] - 0.5) * ih * s, top + R));
    var fSide = fit(want, bw, bh, side.cx - R - padL, H - top - gap - padB);

    // Stacked: robot centred horizontally, heading above or below it.
    var stack = place(W / 2, top + R);
    var aw = W - padL - padR;
    var bottom = H - 2 * gap; // the robot fills most of a phone screen, so use a small bottom margin here
    var fBelow = fit(want, bw, bh, aw, bottom - (stack.cy + R));
    var fAbove = fit(want, bw, bh, aw, stack.cy - R - top - gap);

    var p, f, y;
    if (fSide >= 0.8 * want || fSide >= Math.max(fBelow, fAbove)) {
      p = side; f = fSide;
      y = clamp(p.cy - bh * f / 2, top + gap, H - padB - bh * f);
    } else if (fBelow >= fAbove) {
      p = stack; f = fBelow;
      y = (p.cy + R + bottom - bh * f) / 2;
    } else {
      p = stack; f = fAbove;
      y = (top + gap + p.cy - R - bh * f) / 2;
    }
    f = Math.max(f, 12);

    hero.style.backgroundPosition = p.ox + 'px ' + p.oy + 'px';
    text.style.fontSize = f + 'px';
    text.style.left = padL + 'px';
    text.style.top = y + 'px';
  }

  var queued = false;
  window.addEventListener('resize', function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; layout(); });
  });
  img.onload = layout;
  img.src = hero.dataset.background;
})();
