const express = require('express')

const RegistryCtrl = require('../controllers/registry-ctrl')

const router = express.Router()

router.post('/registry', RegistryCtrl.createRegistry)
router.put('/registry/:id', RegistryCtrl.updateRegistry)
router.delete('/registry/:id', RegistryCtrl.deleteRegistry)
router.get('/registry/:id', RegistryCtrl.getRegistryById)
router.get('/registries', RegistryCtrl.getRegistries)

module.exports = router