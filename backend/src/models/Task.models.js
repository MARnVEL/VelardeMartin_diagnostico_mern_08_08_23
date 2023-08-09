const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: Boolean,
            required: true,
            default: 'Pending'
        },

        // dueDate : {
        //     type : Date,
        // },

        isActive: {
            type: Boolean,
            default: true
        }
    },

    {
        versionKey: false,
        timestamps: true
    }
);

export const TaskModel = model('Task', TaskSchema);
