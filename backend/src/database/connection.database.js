import { connect } from 'mongoose';

export const connectDB = async () => {
    const { TASK_APP_MONGODB_USERNAME, TASK_APP_MONGODB_PASWORD, TASK_APP_MONGODB_DATABASE, TASK_APP_MONGO_CLUSTER } = process.env;

    //!Conexión a MONGO DB ATLAS:

    const MONGO_ATLAS_URL = `mongodb+srv://${TASK_APP_MONGODB_USERNAME}:${TASK_APP_MONGODB_PASWORD}@${TASK_APP_MONGO_CLUSTER}.mongodb.net/${TASK_APP_MONGODB_DATABASE}`;

    //!Conexión a BD local con MONGO DB COMPASS:
    const MONGO_COMPASS_URI = `mongodb://${TASK_APP_MONGODB_HOST}/${TASK_APP_MONGODB_DATABASE}`;

    try {
        //*Conexión a Atlas
        connect(MONGO_ATLAS_URL, {
            retryWrites: true,
            w: 'majority'
            // useUnifiedTopology : true,
            // useNewUrlParser : true
        });

        //*Conexión a Compass.
        /* mongoose.connect(MONGO_COMPASS_URI, {
            useUnifiedTopology : true,
            useNewUrlParser : true
        }); */

        console.log('Conected to the database');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: error.message,
            msg: 'Error trying to connect to the database'
        });
        process.exit(1);
    }
};
