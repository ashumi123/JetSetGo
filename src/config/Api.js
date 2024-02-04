import axios from 'axios';

const ariUrl = 'https://api.npoint.io/4829d4ab0e96bfab50e7';


export async function apirequest() {
    const options = {
        url: ariUrl,
        method:'get',
        timeout: 60000,
      };
const response = await axios(options);

 return response.data;
}



