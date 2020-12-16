'use strict'

const { watch, promises: { readFile } } = require('fs');

class File {
    watch(event, filename) {
        // console.log('this', this);
        // console.log('arguments', Array.prototype.slice.call(arguments));
        this.showContent(filename);
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString()); 
    }
}

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString());
// });

const file = new File();
/**
 * dessa forma, ele ignore o 'this' da classe File
 * e herda o this da função watch
 */
watch(__filename, file.watch);

/**
 * alterantiva para não herdar o this da função
 * não fica muito legal
 */
watch(__filename, (event, filename) => file.watch(event, filename));

/**
 * podemos deixar explicito qual é o contexto que a função deve seguir
 * o bind retorna uma função com o 'this' que se mantém de file, ignorando a função watch
 */
watch(__filename, file.watch.bind(file));

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename);
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename]);