import NotImplementationException from '../notImplementedException.mjs';

export default class ViewFactory { 
    createTable() {
        throw new NotImplementationException(this.createTable.name);
    }
}