const Figma = require('figma-js');
const axios = require('axios');
var hash = require('hash.js')
const figmaData = require('./figma.json');
const qs = require('qs');
const fs = require('fs');
require("dotenv").config();



async function test() {
    
    const fileKey = 'Ig0BYKoaXi5NA90poR04Gc';
    const personalAccessToken = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
    let ids = '0:0'
    let response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
        headers: {
            'X-FIGMA-TOKEN': personalAccessToken,
        },
        // params: {
        //     ids: ids, // Pass the ids as a query parameter
        //   }
    })

    // console.log(`@@@@@@@@@@@@@@@@@@`, response.data);
    // let sm = hash.sha256().update(response.data).digest('hex');
    // console.log(sm);
    // // Write response.data to a file
    fs.writeFileSync('figma.json', JSON.stringify(response.data, null, 2));

    // console.log(client)
}

async function getImages() {
    const fileKey = 'Ig0BYKoaXi5NA90poR04Gc';
    const personalAccessToken = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
    let ids = '0:0'
    let response = await axios.get(`https://api.figma.com/v1/files/${fileKey}/images`, {
        headers: {
            'X-FIGMA-TOKEN': personalAccessToken,
        },
        // params: {
        //     ids: ids, // Pass the ids as a query parameter
        //   }
    })

    console.log(`@@@@@@@@@@@@@@@@@@`, response.data);
    // Write response.data to a file
    // fs.writeFileSync('figma.json', JSON.stringify(response.data, null, 2));

    // console.log(client)
}

// Recursive function to collect all `id` attributes
function collectIds(obj) {
    let ids = [];

    // If the object has an 'id' attribute, add it to the list
    if (obj.id) {
        ids.push(obj.id);
    }

    // If the object has children, recursively collect their ids
    if (Array.isArray(obj.children)) {
        obj.children.forEach(child => {
            ids = ids.concat(collectIds(child));
        });
    }

    return ids;
}

// Function to split ids into batches of a specific size
function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

async function getImagesFromFile() {
    const fileKey = 'Ig0BYKoaXi5NA90poR04Gc';
    const personalAccessToken = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
    // Start collecting ids from the top-level 'document' key
    const allIds = collectIds(figmaData.document);

    // Split the ids into batches of 100
    const batchSize = 250;
    const idBatches = chunkArray(allIds, batchSize);
    
    let batchResults = {};
    for (let index = 0; index < idBatches.length; index = index + 10) {
        console.log(`Fetching batch ${index + 1} of ${idBatches.length}`);
        // Get 10 elements from idBatches at a time to idBatch10 variable from index
        let idBatch10 = idBatches.slice(index, index + 10);
        await Promise.all(idBatch10.map(async (batch, index1) => {
            // let batch = idBatches[index];
            const idsString = batch.join(",");
            // Query your API with the idsString
            try {
                console.log(`Fetching MINI ${index1 + 1} of 10`);
                let response = await axios.get(`https://api.figma.com/v1/images/${fileKey}`, {
                    headers: {
                        'X-FIGMA-TOKEN': personalAccessToken,
                    },
                    params: {
                        ids: idsString, // Pass the ids as a query parameter
                    }
                })
                console.log(`Fetched MINI ${index1 + 1} of 10`);
                
                batchResults = {
                    ...batchResults,
                    ...response.data.images
                }
                //   batchResults.push(response.data.images);  // Collecting images
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }));
        console.log(`Fetched batch ${index + 1} of ${idBatches.length}`);

    }
    // Write response.data to a file
    fs.writeFileSync('img.json', JSON.stringify(batchResults, null, 2));

    // console.log(client)
}

async function testWithOauth() {
    const fileKey = 'Ig0BYKoaXi5NA90poR04Gc';
    let response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
        headers: {
            'Authorization': `Bearer ${oAuthToken}`
        }
        // params: {
        //     ids: ids, // Pass the ids as a query parameter
        //   }
    })

    console.log(`@@@@@@@@@@@@@@@@@@`, response.data.role);
    // console.log(client)
}

async function generateUrl() {
    const baseUrl = 'https://www.figma.com/oauth';
    const params = {
        client_id: 'bD1anmj9olDZpiAFJGtQ4b',
        redirect_uri: 'https://webhook.site/7d6eadae-cd4a-4aac-905a-c6e2c829b022',
        scope: 'files:read',
        state: 'abc',
        response_type: 'code',
    };
    const fullUrl = `${baseUrl}?${qs.stringify(params)}`;

    console.log(fullUrl);
}

async function getAccessToken() {
    const url = 'https://www.figma.com/api/oauth/token';

    const data = qs.stringify({
        client_id: process.env.FIGMA_OAUTH_CLIENT_ID,           // Replace with actual client_id
        client_secret: process.env.FIGMA_OAUTH_CLIENT_SECRET,   // Replace with actual client_secret
        redirect_uri: 'https://webhook.site/7d6eadae-cd4a-4aac-905a-c6e2c829b022',         // Replace with actual redirect_uri
        code: 'WXD5pFBajCDNpIgIt2Sob9V1B',                     // Replace with the authorization code
        grant_type: 'authorization_code',
    });

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
// test();
// generateUrl();
// getAccessToken();
// testWithOauth();
// getImages();
getImagesFromFile();

// https://www.figma.com/oauth?
//   client_id=bD1anmj9olDZpiAFJGtQ4b&
//   redirect_uri=https://webhook.site/7d6eadae-cd4a-4aac-905a-c6e2c829b022&
//   scope=files:read&
//   state=abc&
//   response_type=code