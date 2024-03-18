import axios from 'axios';

const ariUrl = 'https://api.npoint.io/378e02e8e732bb1ac55b';


export async function apirequest() {
    const options = {
        url: ariUrl,
        method:'get',
        timeout: 60000,
      };
const response = await axios(options);

 return response.data;
}



