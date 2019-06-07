const { Member, validate } = require('../models/member');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const debug = require('debug')('app:startup');

router.post('/', async (req, res) => {

    const {
        error
    } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let member = new Member({
        ledgerId: req.body.ledgerId,
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        email: req.body.email
    });
    member = await member.save();
    res.send(member);
});

router.get('/', async (req, res) => {
    const members = await Member.find().sort('lastName');
    res.send(members);
});

router.get('/:id', async (req, res) => {
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).send('Member not found...');

    res.send(member);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const member = await Member.findByIdAndUpdate(req.params.id, {
        ledgerId: req.body.ledgerId,
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        email: req.body.email
    }, {
        new: true
    })


    if (!member) return res.status(404).send('Member not found...');
    res.send(member);
});

router.delete('/:id', async (req, res) => {
    const member = await Member.findByIdAndRemove(req.params.id);

    if (!member) return res.status(404).send('Member not found...');

    res.send(member);
});

module.exports = router;