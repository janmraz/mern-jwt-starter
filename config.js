/**
 * Created by janmraz on 29/10/2016.
 */
module.exports = {
    development: {
        port: process.env.PORT || 8080,
        mongo_url: 'mongodb://127.0.0.1/whatever',
        secret: 'secretBitches'
    },
    production: {
        port: process.env.PORT || 8080,
        mongo_url: '',//mongolab
        secret: 'secretBitches'
    },
    spark_api: '',//sparkpost api
    app_name: 'RPS Online'
};
