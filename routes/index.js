const router = require('express').Router();
const apiRoutes = require('./API');

router.use('/API', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1> Uh oh! 404 error! </h1>');
});

module.exports = router;