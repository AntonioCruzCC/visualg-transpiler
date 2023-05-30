import StatementParser from "./StatementParser";

export default class ReadParser extends StatementParser{

	parse(){
		const readRegex = /^leia\s*\(\s*([a-z][a-z0-9_]*)\s*\)\s*$/i
		if(readRegex.test(this.statement)){
			const variable = this.statement.replace(readRegex, '$1')
			this.checkVariable(variable)
			return variable + ' = prompt("Digite o valor")\n' 
		}else{
			this.throwError('InvalidParser', 'Chamada inválida do comando leia')
		}
	}
}