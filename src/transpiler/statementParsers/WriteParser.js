import StatementParser from "./StatementParser";

export default class WriteParser extends StatementParser{
	parse(){
		const writeRegex = /^escreva\s*\(\s*((?:"[^"]*"|[a-zA-Z][a-zA-Z0-9_]*)(?:\s*,\s*(?:"[^"]*"|[a-zA-Z][a-zA-Z0-9_]*))*)\s*\)$/i
		if(writeRegex.test(this.statement)){
			const value = this.statement.replace(writeRegex, '$1')
			const params = value.split(',')
			params.forEach(param => {
				const variableNameRegex = /^[a-z][a-z0-9_]*/
				if(variableNameRegex.test(param)){
					this.checkVariable(param)
				}
			});
			return 'console.log(' + params.join(' + ') + ')\n'
		}else{
			this.throwError('InvalidParser', 'Chamada inválida do comando leia')
		}
	}
}