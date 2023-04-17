const express = require('express');
const Produk = require('../models/Produk');
const Layanan = require('../models/Layanan');
const mongoose = require('mongoose')
const slugTitle = require('slug')


const fetchAllData = async (req, res) => {
    try {
        const data = await Produk.find().populate('layanan', 'slug title').sort({ createdAt: 'desc' })
        res.status(200);
        res.json(data);
    } catch (err) {
        console.log(err)
        res.json({ "error": err })
    }

}

const fetchData = async (req, res) => {
    try {
        const data = await Produk.find({ "_id": req.params.id }).populate('layanan', 'slug title')
        res.json(data);
    } catch (err) {
        res.json({ "error": err })
    }
}

const addData = async (req, res) => {
    try {
        const layananData = await Layanan.findOne({ slug: req.body.layanan })
        try {
            const data = new Produk({
                slug: slugTitle(req.body.title),
                title: req.body.title,
                layanan: layananData,
                desc: req.body.desc,
                thumbnail: req.file.destination + "" + req.file.filename,
            })


            const dataAdd = await data.save()
            res.status(200);
            res.json(data)
        }
        catch (err) {
            console.log(err)
            res.json({ "error": err })
        }
    } catch (err) {

    }

}

const deleteData = async (req, res) => {
    try {
        const data = await Produk.findByIdAndDelete({ "_id": req.params.id })
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
            const data = await Produk.findOneAndUpdate(
                { "_id": req.params.id },
                {
                    slug: slugTitle(req.body.title),
                    title: req.body.title,
                    layanan: layananData,
                    desc: req.body.desc,
                },
                { new: true }
            )
            res.status(200);
            res.json(data)
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
        const data = await Produk.findOneAndUpdate({ "_id": req.params.id }, { thumbnail: "uploads/not-found.jpg" })
        res.status(200);
        res.json({ status: "ok" })
    }
    catch (err) {
        res.json({ "error": err })
    }
}

const addThumbnail = async (req, res) => {
    try {
        const data = await Produk.findOneAndUpdate({ "_id": req.params.id }, { thumbnail: req.file.destination + "" + req.file.filename })
        res.status(200);
        res.json(data)
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
            const produk = await Produk.find({ layanan: layanan[0]._id }).populate({
                path: 'layanan',
                select: 'slug title',
            })
            res.json(produk);
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