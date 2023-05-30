import StatementParser from "./StatementParser"

export default class ConditionalParser extends StatementParser{

	parse(){
		if(/se\s*\(\s*(.+?)\s*\)\s*entao/.test(this.statement)){
			const condition = this.statement.replace(/se\s*\(\s*(.+?)\s*\)\s*entao/, '$1')
			console.log(condition)
			return 'if( ' + condition + ' ){'
		}else if(/senao\s*/.test(this.statement)){
			return '}else{'
		}else if(/fimse\s*/.test(this.statement)){
			return '}'
		}else{
			this.throwError('InvalidParser', 'Desvio condicional inválido')
		}
	}
}