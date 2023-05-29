import StatementParser from "./StatementParser"

export default class AttributionParser extends StatementParser{
		constructor(statement, variables) {
				super()
				this.variables = variables
				this.statement = statement
		}

		parse() {
			if (/^([a-z][a-z0-9_]+)\s*<-\s*(.+)$/gi.test(this.statement)) {
					const variable = this.statement.replace(/^([a-z][a-z0-9_]+)\s*<-\s*(.+)$/gi, '$1')
					if(!this.variables.includes(variable)){
						this.throwError('Err', 'Variável: ' + variable + ' não declarada')
					}
					const value = this.statement.replace(/^([a-z][a-z0-9_]+)\s*<-\s*(.+)$/gi, '$2')
					this.checkValueValidity(value)
					return variable + ' = ' + value + '\n'
			}else{
				this.throwError('InvalidParser', 'Atribuição inválida')
			}
		}

		checkValueValidity(value){
			const operationRegex = /[+\-*/()]/
			const stringOrNumberRegex = /^\d+$|^".*"$/
			if(stringOrNumberRegex.test(value)){
					//the value is a simple assignment of string or number
					return
			}else if (operationRegex.test(value)) {
				//the value is an operation
				const operands = value.split(operationRegex).filter(Boolean)
				operands.forEach(operand => {
					//if operand is not a string, number or a variable, than the value is invalid
					if(!stringOrNumberRegex.test(operand) && !this.variables.includes(operand)){
						this.throwError('Err', 'Valor inválido de atribuição: ' + value)
					}
				})
			} else {
				this.throwError('Err', 'Valor inválido de atribuição: ' + value)
			}
		}
}