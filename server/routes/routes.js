const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

let upload = multer({
    storage: storage,
}).single('image');

router.get('/:email', API.fetchAllNotes);
router.get('/pined/:email', API.fetchAllPinedNotes);
router.get('/archived/:email', API.fetchArchivedNotes);
router.get('/edit/:id', API.fetchNoteById);
router.get('/edit-archived/:id', API.fetchArchivedNoteById);
router.post('/', upload, API.createNote);
router.patch('/:id', upload, API.updateNote);
router.patch('/update-archived/:id', upload, API.updateArchivedNote);
router.patch('/archive/:id', API.archiveNote);
router.patch('/pin/:id', API.pinNote);
router.patch('/unarchive/:id', API.unarchiveNote);
router.patch('/unpin/:id', API.unpinNote);
router.delete('/:id', API.deleteNote);

module.exports = router;