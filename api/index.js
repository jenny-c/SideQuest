const {queryProjects} = require('./utils');

exports.searchProjects = async (request, response) => {

    // TODO: see how to parse post requests https://cloud.google.com/functions/docs/writing/http#parsing_http_requests
    // TODO: read token from firebase

    const data = request.body;
    console.log("Request Data Body", data);
    console.log("Request Data Parsed", data.parsed);

    const {skills, interests} = data;

    let results = await queryProjects(skills, interests);
    console.log('Query Result', results);

    results = results.hits.map((result) => {
        delete result._highlightResult;
        return result
    });

    response.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });

    response.set('Content-Type', 'application/json');
    response.status(200).send({
        "body": {
            "projects": results
        }
    });
};



