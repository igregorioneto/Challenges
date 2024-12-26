const paginationMiddleware = (req, res, next) => {
    // Obter valores por parâmetro
    const { page = 1, limit = 3, q = '' } = req.query;

    // Calcular o skip
    const skip = (page - 1) * limit;

    // Criar o termo de busca
    const searchTerm = q;
    const search = new RegExp(q, 'gi');

    // Adicionando o objeto no contexto da solicitação
    req.context = {
        page: Number(page),
        limit: Number(limit),
        skip: Number(skip),
        searchTerm,
        search
    }

    next();
}

module.exports = paginationMiddleware;