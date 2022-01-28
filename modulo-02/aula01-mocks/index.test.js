const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async() => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);

        await rejects(result, rejection);
    }

    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);

        await rejects(result, rejection);
    }

    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJSON(filePath);
        const expected = [
            {
                "id": 123,
                "name": "Jhon Doe",
                "profession": "Javascript Instructor",
                "birthDay": 1995
            },
            {
                "id": 321,
                "name": "Jhon Tre",
                "profession": "Javascript Expert",
                "birthDay": 1955
            },
            {
                "id": 123,
                "name": "Jhon Qua",
                "profession": "Java Developer",
                "birthDay": 1990
            }
        ];
        

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }


    
})();