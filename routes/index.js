const express = require(`express`);
const router = express.Router();

const APIRoutes = require(`./APIRoutes`);
const HTMLRoutes = require(`./HTMLRoutes`);

router.use(HTMLRoutes);
router.use(APIRoutes);

module.exports = router;