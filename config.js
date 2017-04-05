/**
 * Created by janmraz on 29/10/2016.
 */
module.exports = {
    development: {
        port: process.env.PORT || 8080,
        mongo_url: 'mongodb://127.0.0.1/hotelsocial',
        secret: 'secretBitches'
    },
    production: {
        port: process.env.PORT || 8080,
        mongo_url: 'mongodb://ohohoh:1998112@ds151078.mlab.com:51078/camaga',
        secret: 'secretBitches'
    },
    spark_api: 'cbc7847d474a1becc709179b6bd58422c80c284a',
    app_name: 'RPS Online'
};
