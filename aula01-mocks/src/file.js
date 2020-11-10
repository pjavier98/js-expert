const { readFile } = require('fs/promises');
const { join } = require('path');
const { error } = require('./constants');

const User = require('./user');

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJSON(filePath) {
        const content = await File.getFileContent(filePath);

        const validation = File.isValid(content);

        if (!validation.valid) throw new Error(validation.error);

        const users = File.parseCSVToJSON(content);

        return users;
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf8');
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...fileWithoutHeader] = csvString.split('\n');
        
        const isHeaderValid = header === options.fields.join(',');

        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false,
            }
        }

        const isContentLengthAccepted = (
            fileWithoutHeader.length > 0 && 
            fileWithoutHeader.length <= options.maxLines
        );

        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false,
            }
        }

        return {
            valid: true,
        }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split('\n');
        // remove the first item and assigns in the variable
        const firstLine = lines.shift();
        const header = firstLine.split(',');

        const users = lines.map(line => {
            const columns = line.split(',');
            let user = {};

            for (const index in columns) {
                user[header[index]] = columns[index];
            }

            return new User(user);
        });

        return users;
    }
}

/**
 * Closure => Função que se auto-executa
 */

// (async () => {
//     const result = await File.csvToJSON('./../mocks/threeItems-valid.csv');
//     // const result = await File.csvToJSON('./../mocks/fourItems-invalid.csv');
//     // const result = await File.csvToJSON('./../mocks/invalid-header.csv');

//     console.log('result', result);
// })();

module.exports = File;