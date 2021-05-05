const Note = require('../models/notes');
const fs = require('fs');

module.exports = class API {
    static async fetchAllNotes(req, res) {
        const email = req.params.email;
        try {
            const notes = await Note.find({ email: email, archived: false });
            res.status(200).json(notes);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async fetchArchivedNotes(req, res) {
        const email = req.params.email;
        try {
            const notes = await Note.find({ email: email, archived: true });
            res.status(200).json(notes);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async fetchNoteById(req, res) {
        const id = req.params.id;
        try {
            const note = await Note.findById(id);
            res.status(200).json(note);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async fetchArchivedNoteById(req, res) {
        const id = req.params.id;
        try {
            const note = await Note.findById(id);
            res.status(200).json(note);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async createNote(req, res) {
        const note = req.body;
        const imagename = req.file.filename;
        note.image = imagename;
        try {
            await Note.create(note);
            res.status(201).json({ message: 'Note added!' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async updateNote(req, res) {
        const id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image)
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const newNote = req.body;
        newNote.image = new_image;

        try {
            await Note.findByIdAndUpdate(id, newNote);
            res.status(200).json({ message: 'Note updated!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async updateArchivedNote(req, res) {
        const id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image)
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const newNote = req.body;
        newNote.image = new_image;

        try {
            await Note.findByIdAndUpdate(id, newNote);
            res.status(200).json({ message: 'Note updated!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async archiveNote(req, res) {
        const id = req.params.id;
        try {
            await Note.findByIdAndUpdate(id, { archived: true });
            res.status(200).json({ message: 'Note archived!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async unarchiveNote(req, res) {
        const id = req.params.id;
        try {
            await Note.findByIdAndUpdate(id, { archived: false });
            res.status(200).json({ message: 'Note unarchived!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async deleteNote(req, res) {
        const id = req.params.id;
        try {
            const result = await Note.findByIdAndDelete(id);
            if (result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: 'Note deleted successfully!' })
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};