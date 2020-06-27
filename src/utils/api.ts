// Dependencies
import axios from 'axios'
import {resp} from "@/models/analytics"

let base = 'https://api.znai-krai.zekovnet.ru';

export async function getAnalytics() {
    return (await axios.get(`${base}/analytics`)
        .catch((err) => {
            // try to connect to main server. If there's any error, request to heroku
            if ( base !== "https://api-znaikrai.herokuapp.com" ) {
                console.log("Connection to the main server failed. Reconnecting...");
                base = "https://api-znaikrai.herokuapp.com";
                return getAnalytics().then(response => {
                    return response
                });
            } else
                return err
        }))
}

export async function getQuestions(to: string) {
    return (await axios.get(`${base}` + to)
        .catch((err) => {
            // try to connect to main server. If there's any error, request to heroku
            if ( base !== "https://api-znaikrai.herokuapp.com" ) {
                console.log("Connection to the main server failed. Reconnecting...");
                base = "https://api-znaikrai.herokuapp.com";
                return getQuestions(to).then(response => {
                    return response
                });
            } else
                return err
        }))
}

export async function sendForm(data: object, to: string) {
    return (await axios.post(`${base}` + to, data)
            .catch((err) => {
                // try to connect to main server. If there's any error, request to heroku
                if ( base !== "https://api-znaikrai.herokuapp.com" ) {
                    console.log("Connection to the main server failed. Reconnecting...");
                    base = "https://api-znaikrai.herokuapp.com";
                    return sendForm(data, to);
                } else
                    return err
            })
    );
}

// places
export async function getPlaces() {
    return (await axios.get(`${base}/places/`)
        .catch((err) => {
            // try to connect to main server. If there's any error, request to heroku
            if ( base !== "https://api-znaikrai.herokuapp.com" ) {
                base = "https://api-znaikrai.herokuapp.com";
                console.log("Connection to the main server failed. Reconnecting...");
                return getPlaces().then(response => {
                    return response
                });
            } else
                return err
        }))
}

// places/id
export async function getPlace(id: string) {
    return (await axios.get(`${base}/places/` + id)
        .catch((err) => {
            // try to connect to main server. If there's any error, request to heroku
            if ( base !== "https://api-znaikrai.herokuapp.com" ) {
                console.log("Connection to the main server failed. Reconnecting...");
                base = "https://api-znaikrai.herokuapp.com";
                return getPlace(id);
            } else
                return err
        }))
}

/*export async function reset(user: User) {
  return (await axios.post(
    `${base}/users/reset`,
    {},
    {
      headers: getHeaders(user),
    }
  )).data
}*/

/*
function getHeaders(user: User) {
  if (user.token) {
    return { token: user.token }
  } else {
    return undefined
  }
}
*/
