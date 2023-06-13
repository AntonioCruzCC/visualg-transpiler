import StatementParser from "./StatementParser"

export default class AttributionParser extends StatementParser {

	parse() {
		const attributionRegex = /^([a-z][a-z0-9_]*)\s*<-\s*(.+)$/gi
		if (attributionRegex.test(this.statement)) {
			const variable = this.statement.replace(attributionRegex, '$1')
			this.checkVariable(variable)
			const value = this.statement.replace(attributionRegex, '$2')
			//this.checkValueValidity(value)
			return variable + ' = ' + value + '\n'
		} else {
			this.throwError('InvalidParser', 'Atribuição inválida')
		}
	}

	checkValueValidity(value) {
		const operationRegex = /[+\-*/()]/
		const stringOrNumberRegex = /^\d+$|^".*"$/
		const variableNameRegex = /^[a-z][a-z0-9_]*/
		if (stringOrNumberRegex.test(value)) {
			//the value is a simple assignment of string or number
			return
		} else if (variableNameRegex.test(value)) {
			//the value may be a variable
			this.checkVariable(value)
		} else if (operationRegex.test(value)) {
			//the value is an operation
			const operands = value.split(operationRegex).filter(Boolean)
			operands.forEach(operand => {
				//if operand is not a string, number or a variable, than the value is invalid
				operand = operand.trim()
				if (!stringOrNumberRegex.test(operand) && !this.variables.includes(operand)) {
					this.throwError('Err', 'Valor inválido de atribuição: ' + value)
				}
			})
		} else {
			this.throwError('Err', 'Valor inválido de atribuição: ' + value)
		}
	}
}