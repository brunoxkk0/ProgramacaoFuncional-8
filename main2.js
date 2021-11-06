const fs = require('fs');
const { DOMParser } = require('xmldom');
const R = require('ramda');

const { newIsValid, elementsToArray, getGitHubProject, contentOfAdded, contentOfUpdated } = require('./xmlfilter');

// efetua o processamento do xml e armazena a estrutura no objeto 'document'
const document = new DOMParser().parseFromString(fs.readFileSync('res/f-droid.xml', 'utf-8'));

const isAddedAfter2000AndUpdatedAfter2020 = newIsValid(R.__, 2000, 2020);


const addedApps = elementsToArray(document.getElementsByTagName('application'))
    .filter(isAddedAfter2000AndUpdatedAfter2020)
    .map(el => {
        console.log("Nome: " + getGitHubProject(el) + " Adicionado em: " + contentOfAdded(el) + " Atualizado em: " + contentOfUpdated(el))
    });

