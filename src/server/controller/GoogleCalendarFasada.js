const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { dbInstance } = require('../DB/BazaTransakcij');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
const calendarList = async (req, res) => {
    const ID_sprehod = { ...req.body };
    fs.readFile('./GoogleSecret/credentials.json', async (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        const url = await authorize(JSON.parse(content), addEvent, ID_sprehod);
        if (url) {
            res.status(200).json(url);
        }
        res.status(200);
    });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = async (credentials, callback, ID_sprehod) => {
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    try {
        const token = fs.readFileSync(TOKEN_PATH);
        console.log("test2  " + token);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, ID_sprehod);
        return false;
    } catch (err) {
        console.log("test  " + err);
        return getAccessToken(oAuth2Client);
    }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
const getAccessToken = async (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
}

const confirmToken = async (req, res) => {
    fs.readFile('./GoogleSecret/credentials.json', async (err, content) => {
        const credentials = JSON.parse(content);
        if (err) return console.log('Error loading client secret file:', err);
            const {client_secret, client_id, redirect_uris} = credentials.web;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
            const code = { ...req.body };
            oAuth2Client.getToken(code, (err, token) => {
                console.log(token);
            if (err) return res.status(500).json('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
                res.status(200);
            });
        });
    });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const addEvent = async(auth, ID_sprehod) => {
    const event = await createEvent(ID_sprehod);
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    }, (err, event) => {
        if (err) return console.log('There was an error contacting the Calendar service: ' + err);
        console.log('Event created: %s', event.htmlLink);
    });
}

const createEvent = async (ID_sprehod) => {
    const data = await dbInstance
        .select(OGLAS.Lokacija, SPREHOD.CasOdziva, UPORABNIK.Email, UPORABNIK.GSM, PES.Ime_pes)
        .from('SPREHOD')
        .innerJoin('OGLAS', 'OGLAS.ID_oglas', 'SPREHOD.ID_OGLAS')
        .innerJoin('PES', 'PES.ID_pes', 'SPREHOD.ID_pes')
        .innerJoin('UPORABNIK', 'UPORABNIK.ID_uporabnik', 'SPREHOD.ID_uporabnik')
        .where('SPREHOD.ID_sprehod', ID_sprehod);

    var start = new Date(data[0].CasOdziva);
    start.setDate(start.getDate() + 1);
    var end = new Date(data[0].CasOdziva);
    end.setDate(end.getDate() + 2);
    var event = {
        'summary': 'Sprehod ' + ID_sprehod,
        'location': data[0].Lokacija,
        'description': 'Ime psa: ' + data[0].Ime_pes + '. Številka lastnika: ' + data[0].GSM + '.',
        'start' : {
            'dateTime': start
        },
        'end' : {
            'dateTime': end
        },
        'attandees': [
            { 'email': data[0].EMAIL }
        ]
    };

    return event;
}

module.exports = {
    calendarList,
    confirmToken
}