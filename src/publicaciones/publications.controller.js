import { response, request, json } from "express";
import bcryptjs from 'bcryptjs';
import Publications from './publications.model.js';

export const getPublicationsById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publications.findOne({ _id: id });
        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }
        res.status(200).json({ publication });
    } catch (error) {
        console.error('Error fetching publication by ID', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const publicationsPost = async (req, res) => {
    try {
        const { title, category, text } = req.body;
        const publication = new Publications({ title, category, text });
        await publication.save();
        res.status(200).json({ publication });
    } catch (error) {
        console.error('Error creating publication', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const publicationsPut = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const publication = await Publications.findByIdAndUpdate(id, updateData, { new: true });
        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }
        res.status(200).json({ msg: 'Publication updated successfully', publication });
    } catch (error) {
        console.error('Error updating publication', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const publicationsDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publications.findByIdAndDelete(id);
        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }
        res.status(200).json({ msg: 'Publication deleted successfully', publication });
    } catch (error) {
        console.error('Error deleting publication', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
