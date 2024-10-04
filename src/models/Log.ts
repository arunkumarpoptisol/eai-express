// models/Log
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
    phase: {
        type: String,
        enum: ['shopify','adapter', 'transform'], // modify if necessary
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const Log = model('Log', logSchema);

export default Log;
