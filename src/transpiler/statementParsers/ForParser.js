import StatementParser from "./StatementParser";

export default class ForParser extends StatementParser{
	
	parse(){
		const forRegex = /^\s*para\s+([a-zA-Z_]\w*)\s+de\s+([^ ]+)\s+(?:ate|ateh)\s+([^ ]+)\s+(?:passo|paso)\s+([^ ]+)\s*faca\s*$/i;
		const endForRegex = /^\s*fimpara\s*$/i
		if(forRegex.test(this.statement)){
			const variable = this.statement.replace(forRegex, '$1')
			const from = this.statement.replace(forRegex, '$2')
			const to = this.statement.replace(forRegex, '$3')
			const step = this.statement.replace(forRegex, '$4')
			return 'for( ' + variable + ' = ' + from + ' ; ' + variable + ' <= ' + to + ' ; ' + variable + ' += ' +  step + ' ){'
		}else if(endForRegex.test(this.statement)){
			return '}';
		}else{
			this.throwError('InvalidParser', 'Laço de repetição inválido')
		}
	}
	
}