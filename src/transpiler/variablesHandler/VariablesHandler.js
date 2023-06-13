import { toast } from "react-toastify"

export default class VariablesHandler {

	constructor(entryCode) {
		this.entryCode = entryCode
	}

	//create a constant with all the visualg reserved words
	reservedWords = ['var', 'inteiro', 'real', 'caracter', 'logico', 'cadeia', 'constante', 'registro', 'fim_registro', 'procedimento', 'fim_procedimento', 'funcao', 'fim_funcao', 'se', 'entao', 'senao', 'fim_se', 'escolha', 'caso', 'fim_caso', 'para', 'ate', 'faca', 'fim_para', 'enquanto', 'fim_enquanto', 'repita', 'fim_repita', 'retorne', 'escreva', 'leia', 'limpa', 'aguarde', 'fim_algoritmo', 'inicio']

	handle() {
		//check if the first word if "Var" ingoring the case
		if (!/^var\s*/gi.test(this.entryCode)) {
			toast.warn('Palavra reservada "Var" não encontrada')
			// throw Error('Palavra reservada "Var" não encontrada')
		} else {
			//remove the "Var" word ignoring the case and trim the white space on the left
			this.entryCode = this.entryCode.replace(/^var\s*/gi, '').trimLeft()
			return { variables: this.findVariables(), codeLeft: this.entryCode }
		}
	}

	findVariables() {
		let variables = []
		let variableName = this.getVariableName()
		while (variableName) {
			if(variables.includes(variableName)){
				// toast.error('Variável "' + variableName + '" já declarada')
				throw Error('Variável "' + variableName + '" já declarada')
			}
			variables.push(variableName)
			//check if the next character is a comma, if it is remove it and trim the white space on the left
			if (this.entryCode[0] === ',') {
				this.entryCode = this.entryCode.replace(/^,\s*/gi, '').trimLeft()
				variableName = this.getVariableName()
				if (!variableName) {
					throw Error('Variável não encontrada')
				}
			} else {
				//check if the next character is a colon, if it is remove it and trim the white space on the left
				if (this.entryCode[0] === ':') {
					const variableType = this.getVariableType()
					if (variableType) {
						//check if the next word is "inicio" ignoring case, if it is break the while loop
						if (/^inicio\s*/gi.test(this.entryCode)) {
							break;
						}
						variableName = this.getVariableName()
					} else {
						throw Error('Tipo não encontrado')
					}
				} else {
					toast.error('Caractere inválido')
					// throw Error('Caractere inválido')
				}
			}
		}
		return variables
	}

	getVariableName() {
		const variableNameRegex = /^[a-z][a-z0-9_]*/gi
		let match = variableNameRegex.exec(this.entryCode)
		if (match) {
			const variableName = match[0]
			if (this.reservedWords.includes(variableName)) {
				toast.warn('Palavra reservada "' + variableName + '" não pode ser usada como nome de variável')
				// throw Error('Palavra reservada "' + variableName + '" não pode ser usada como nome de variável')
			}
			this.entryCode = this.entryCode.replace(variableNameRegex, '').trimLeft()
			return match[0]
		}
	}

	getVariableType() {
		this.entryCode = this.entryCode.replace(/^:\s*/gi, '').trimLeft()
		const variableTypeRegex = /^(inteiro|real|caracter|logico|cadeia)\s*/gi
		const match = variableTypeRegex.exec(this.entryCode)
		if (match) {
			this.entryCode = this.entryCode.replace(/^(inteiro|real|caracter|logico|cadeia)\s*/gi, '').trimLeft()
			return match[0]
		}
	}
}