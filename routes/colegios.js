const {Router} = require('express')
const route = Router()

const{colegioGet, colegioPost, colegioPut, colegioDelete} = require ('../controllers/colegioController')

route.get('/', colegioGet);
route.post('/', colegioPost);
route.put('/', colegioPut);
route.delete('/', colegioDelete);

module.exports = route