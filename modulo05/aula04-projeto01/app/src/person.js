const { evaluateRegex } = require('./util');

class Person {
    /**
     * (\w+):\s.*
     * $1
     */
    constructor([
        name,
        nationality,
        maritalStatus,
        document,
        street,
        number,
        neighborhood,
        state
    ]) {

        /**
         * ^ => começo da string
         * + => um ou mais ocorrências
         * (\w{1}) => pega só a primeira palavra e deixa em um grupo
         * (a-z A-Z) encontra letras maiusculas ou minusculas, 
         * adicionamos o + para ele pegar todas  as letras até o caracter especial
         * g => todas as ocorrências que encontrar
         */
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-z A-Z]+$)/);
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`;
            })
        }

        /**
         * (\w+),
         * this.$1 = $1
         */
        this.name = name;
        this.nationality = formatFirstLetter(nationality);
        this.maritalStatus = formatFirstLetter(maritalStatus);

        /**
         * tudo que não for digito é removido
         * /g serve para todas as ocorrências
         */
        this.document = document.replace(evaluateRegex(/\D/g), '');

        /**
         * começa a procurar depois do " a " e pega tudo que tem a frente
         * (?<= faz com que ignore tudo que tiver antes desse match)
         * conhecido como positive lookBehind
         */
        this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
        this.number = number;

        /**
         * não passamos o /g pois só tem uma ocorrência
         * começa a buscar depois do espaço, pega qualquer letra ou digito
         * até o fim da linha
         */
        this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s).*$/)).join();

        /**
         * remove o ponto literal (.) do fim da frase
         */
        this.state = state.replace(evaluateRegex(/\.$/), '');
    }
}

module.exports = Person;