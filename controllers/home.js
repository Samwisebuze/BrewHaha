/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};

/**
 * GET/
 * List Home Page
 * - Authenticated Homepage
 */
exports.getHome = (req, res) => res.render('list', {
  title: 'Bars Near You',
});
