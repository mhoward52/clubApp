const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/microtrain')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('COULD NOT CONNECT...', err));

const memberSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: [
            'Pres.',
            'VP',
            'Sec.',
            '1st Lt.',
            'Lt.'
        ]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: String,
    phone: {
        type: Number,
        min: 10,
        max: 10
    },
    email: String,
    date: {
        type: Date,
        default: Date.now
    },
    isVisible: Boolean
});

const Member = mongoose.model('Member', memberSchema);

async function createMember() {
    const member = new Member({
        title: 'Lt.',
        firstName: 'Kevin',
        lastName: 'Johnson',
        address1: '321 First St',
        address2: '',
        phone: '7085552222',
        email: 'imkevin@aol.net',
        isVisible: true
    });

    try {
        const result = await member.save();
        console.log('Result', result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

async function getMembers() {
    const members = await Member
        .find()
        .sort({
            lastName: 1
        });
    console.log(members);
}

async function updateMember(id) {
    const member = await Member.findById(id);
    if (!member) return;

    member.isVisible = false;
    member.phone = 7775553333;

    const result = await member.save();
    console.log(result);
}

async function removeMember(id) {
    const result = await Member.deleteOne({
        _id: id
    });
    console.log(result);
}

// updateMember();