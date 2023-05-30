export default class StatementParser{

	constructor(statement, variables){
		this.statement = statement
		this.variables = variables
	}

	throwError(code, message){
		const error = new Error(message)
		error.code = code
		throw error
	}

	checkVariable(variable){
		if(!this.variables.includes(variable))
			this.throwError('Err', 'Variável: ' + variable + ' não declarada')
	}
}