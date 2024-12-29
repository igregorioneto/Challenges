'use strict';
import https from "https";

async function getCountryName(code) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
    const response = await fetchPage();
    const per_page = response.total_pages;
    let country = null;

    for (var i = 1; i <= per_page; i++) {
        const data = await fetchPage(i);

        country = data.data.find((country) => 
            country.alpha2Code === code            
        );

        if (country) {
            return country.name;
        }
    }

    return undefined;
    
}

async function fetchPage(pageNumber) {
    let url = `https://jsonmock.hackerrank.com/api/countries`;
    if (pageNumber) {
        url = `https://jsonmock.hackerrank.com/api/countries?page=${pageNumber}`
    }
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

const name = await getCountryName('AF');
console.log(name);