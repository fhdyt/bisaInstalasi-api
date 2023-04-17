const express = require('express');
const Jasa = require('../models/Jasa');
const Layanan = require('../models/Layanan');
const mongoose = require('mongoose')
const slugTitle = require('slug')


const fetchAllData = async (req, res) => {
    try {
        const jasa = await Jasa.find().populate('layanan', 'slug title').sort({ createdAt: 'desc' })
        res.status(200);
        res.json(jasa);
    } catch (err) {
        res.json({ "error": err })
    }

}

const fetchData = async (req, res) => {
    try {
        const jasa = await Jasa.find({ "_id": req.params.id }).populate('layanan', 'slug title')
        res.json(jasa);
    } catch (err) {
        res.json({ "error": err })
    }
}

const addData = async (req, res) => {
    try {
        const layananData = await Layanan.findOne({ slug: req.body.layanan })
        try {
            const jasa = new Jasa({
                slug: slugTitle(req.body.title),
                title: req.body.title,
                layanan: layananData,
                content: req.body.content,
                thumbnail: req.file.destination + "" + req.file.filename,
            })

            const jasaAdd = await jasa.save()
            res.status(200);
            res.json(jasa)
        }
        catch (err) {
            res.json({ "error": err })
        }
    } catch (error) {

    }
}

const deleteData = async (req, res) => {
    try {
        const jasa = await Jasa.findByIdAndDelete({ "_id": req.params.id })
        res.status(200);
        res.json({ status: "ok" })
    }
    catch (err) {
        res.json({ "error": err })
    }


}

const modifData = async (req, res) => {
    try {
        const layananData = await Layanan.findOne({ slug: req.body.layanan })
        try {
            console.log(req.body.title)
            const jasa = await Jasa.findOneAndUpdate(
                { "_id": req.params.id },
                {
                    slug: slugTitle(req.body.title),
                    title: req.body.title,
                    layanan: layananData,
                    content: req.body.content,
                },
                { new: true }
            )
            res.status(200);
            res.json(jasa)
        }
        catch (err) {
            console.log(err)
            res.json({ "error": err })
        }
    } catch (error) {

    }

}

const deleteThumbnail = async (req, res) => {
    try {
        const jasa = await Jasa.findOneAndUpdate({ "_id": req.params.id }, { thumbnail: "uploads/not-found.jpg" })
        res.status(200);
        res.json({ status: "ok" })
    }
    catch (err) {
        res.json({ "error": err })
    }
}

const addThumbnail = async (req, res) => {
    try {
        const jasa = await Jasa.findOneAndUpdate({ "_id": req.params.id }, { thumbnail: req.file.destination + "" + req.file.filename })
        res.status(200);
        res.json(jasa)
    }
    catch (err) {
        res.json({ "error": err })
    }
}

const fetchDataLayanan = async (req, res) => {
    try {
        const layanan = await Layanan.find({ slug: req.params.id })
        try {
            console.log(req.params.id)
            const jasa = await Jasa.find({ layanan: layanan[0]._id }).populate({
                path: 'layanan',
                select: 'slug title',
            })
            res.json(jasa);
        } catch (err) {
            console.log(err)
            res.json({ "error": err })
        }
    } catch (err) {
        console.log(err)

    }
}
module.exports = {
    fetchAllData,
    fetchData,
    addData,
    deleteData,
    modifData,
    deleteThumbnail,
    addThumbnail,
    fetchDataLayanan
}