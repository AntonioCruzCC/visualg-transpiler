import StatementParser from "./StatementParser";

export default class WriteParser extends StatementParser{
	parse(){
		const writeRegex = /^(?:escreva|escreval)\s*\((\s*(?:(?:"[^"]*"|[aA-zZ][aA-zZ0-9_]*)\s*(?:,\s*(?:"[^"]*"|[aA-zZ][aA-zZ0-9_]*))*)?\s*)\)$/i
		if(writeRegex.test(this.statement)){
			const value = this.statement.replace(writeRegex, '$1')
			const params = value.split(',')
			return 'console.log(' + params.join(' + ') + ')\n'
		}else{
			this.throwError('InvalidParser', 'Chamada inválida do comando leia')
		}
	}
}