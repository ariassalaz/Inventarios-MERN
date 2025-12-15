const express = require("express");
const router = express.Router();
const { crearVenta } = require("../controladores/controladorVentas");
const { proteger } = require("../middleware/authMiddleware"); // <- tu middleware

router.post("/", proteger, crearVenta);

module.exports = router;
