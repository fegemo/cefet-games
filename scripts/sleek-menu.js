module.exports = function() {
  const pageHeaderEl = document.getElementById('page-header');
  const bodyClasses = document.body.classList;

  if (pageHeaderEl) {
    pageHeaderEl.addEventListener('mouseover', function() {
      bodyClasses.add('menu-open');
    });

    pageHeaderEl.addEventListener('mouseleave', function() {
      bodyClasses.remove('menu-open');
    });
  }
};
