const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');

const Member = mongoose.model('Member', new mongoose.Schema({
    ledgerId: {
        type: Number,
        default: null
    },
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
    address2: {
        type: String,
        default: null
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: [
            'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
        ],
        uppercase: true
    },
    zipCode: {
        type: Number,
        default: null
    },
    phone: {
        type: Number,
        default: null
    },
    email: {
        String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVisible: {
        type: Boolean,
        default: true
    }
}));

function validateMember(member) {
    const schema = {
        ledgerId: Joi.number(),
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string(),
        city: Joi.string().required(),
        state: Joi.string().min(2).max(2).required(),
        zipCode: Joi.string().min(5).max(5).required(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string()
    };
    return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateCustomer;