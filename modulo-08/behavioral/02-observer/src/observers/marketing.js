export default class Marketing {
    update({ id, username }) {
        /**
         * o método é responsavel por gerenciar seus erros/exceptions
         * não deve-se ter await no notify porque a responsabilidade dele é so emitir eventos
         */
        console.log(`[${id}] [marketing] will send an wellcome email to [${username}]`)
    }
}