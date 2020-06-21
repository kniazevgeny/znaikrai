// Dependencies
import axios from 'axios'
import {category, resp} from "@/models/analytics"

const base = 'https://api-znaikrai.herokuapp.com';

export async function getAnalytics() {
    return (await axios.get(`${base}/analytics`)).data as resp
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
