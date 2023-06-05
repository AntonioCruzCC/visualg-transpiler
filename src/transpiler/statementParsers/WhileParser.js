import StatementParser from "./StatementParser";

export default class WhileParser extends StatementParser {
    parse() {
        const whileRegex = /^\s*enquanto\s+\(?([^)]+)\)?\s+faca\s*$/i
        const endWhileRegex = /^\s*fimenquanto\s*$/i
        if(whileRegex.test(this.statement)){
            const condition = this.statement.replace(whileRegex, '$1')
            return 'while( ' + condition + ' ){'
        }else if(endWhileRegex.test(this.statement)){
            return '}'
        }else{
            this.throwError('InvalidParser', 'Laço de repetição inválido')
        }
    }
}