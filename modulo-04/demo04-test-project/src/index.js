import database from '../database.json';
import Person from './person.js';
import TerminalController from './terminalController.js';
import { save } from './repository.js';

const DEFAULT_LANGUAGE = 'pt-BR';
const STOP_TERMINAL = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
    try {
        const answer = await terminalController.question('');
        
        if (answer === STOP_TERMINAL) {
            terminalController.closeTerminal();
            console.log('process finished');
            return;
        }

        const person = Person.generateInstanceFromString(answer);
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));

        await save(person);

        return mainLoop();
    } catch (error) {
        console.log('DEU RUIM**', error);
        return mainLoop();
    }
}

await mainLoop();