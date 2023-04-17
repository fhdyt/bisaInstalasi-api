const express = require('express');
const Layanan = require('../models/Layanan');
const Jasa = require('../models/Jasa');
const Produk = require('../models/Produk');
const mongoose = require('mongoose')
const slugTitle = require('slug')


const fetchAllData = async (req, res) => {
    try {
        const data = await Layanan.find().sort({ createdAt: 'desc' })
        res.status(200);
        res.json(data);
    } catch (err) {
        res.json({ "error": err })
    }

}

const addData = async (req, res) => {
    try {
        const layanan = new Layanan({
            slug: slugTitle(req.body.title),
            title: req.body.title,
        })


        const layananAdd = await layanan.save()
        res.status(200);
        res.json(layanan)
    }
    catch (err) {
        res.json({ "error": err })
    }
}

const fetchLayanan = async (req, res) => {
    try {
        const layanan = await Layanan.find({ slug: req.params.id })
        try {
            console.log(req.params.id)
            const jasa = await Jasa.find({ layanan: layanan[0]._id }).populate({
                path: 'layanan',
                select: 'slug title',
            })
            const produk = await Produk.find({ layanan: layanan[0]._id }).populate({
                path: 'layanan',
                select: 'slug title',
            })

            res.json({ "jasa": jasa, "produk": produk });
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
    addData,
    fetchLayanan
}