const API = require('./mock-api');
const EventEmitter = require('events');
// To count the matches, call API.countMatches(term) where term is the search term
class Search extends EventEmitter {
    constructor() {
        super();
    }

    async searchCount(term) {
        // Emite o evento SEARCH_STARTED imediatamente
        this.emit('SEARCH_STARTED', term);

        if (!term) {
            // Se o termo for inválido emite o SEARCH_ERROR
            this.emit('SEARCH_ERROR', { message: 'INVALID_TERM', term });
            return;
        }

        try {
            // Chama a API countMatches
            const count = await API.countMatches(term);

            // Emite o evento SEARCH_SUCCESS se a API retornar com sucesso
            this.emit('SEARCH_SUCCESS', { count, term });
        } catch (error) {
            // Emite o evento SEARCH_ERROR se a API lançar um erro
            this.emit('SEARCH_ERROR', { message: error.message, term })
        }
    }
}

module.exports = Search;