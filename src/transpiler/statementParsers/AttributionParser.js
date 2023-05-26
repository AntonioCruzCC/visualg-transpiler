export default class AttributionParser{

		constructor(statement, variables) {
				this.variables = variables
				this.statement = statement
		}

		parse() {
			//check if the statement is an attribution, an attribution has the following pattern: <variable> <- <value>, if it is, grab the variable and the value
			if (/^([a-z][a-z0-9_]+)\s*<-\s*(.+)$/gi.test(this.statement)) {
					const variable = this.statement.replace(/^([a-z][a-z0-9_]+)\s*<-\s*(.+)$/gi, '$1')
					if(!this.variables.includes(variable)){
						const error = new Error('Variável: ' + variable + ' não declarada')
						error.code = 'Err'
						throw error
					}
					const value = this.statement.replace(/^([a-z][a-z0-9_]+)\s*<-\s*(.+)$/gi, '$2')
					return variable + ' = ' + value + '\n'
			}else{
				const error = new Error('Atribuição inválida')
				error.code = 'InvalidParser'
				throw error
			}
		}
}