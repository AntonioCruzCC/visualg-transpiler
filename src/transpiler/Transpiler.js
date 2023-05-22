import HeaderHandler from "./headerHandler/HeaderHandler"
import VariablesHandler from "./variablesHandler/VariablesHandler"

export default class Transpiler{

	constructor(entryCode){
		this.entryCode = entryCode
	}

	transpile(){
		// trim the white space on the left of the entry code
		this.entryCode = this.entryCode.trimLeft()
		const algoritmName = this.getAlgoritmName()
		const variables = this.getVariables()
		return	'//Algoritmo: ' + algoritmName + '\n' + 
						'Variaveis: ' + variables + '\n' + 
						'Corpo:\n' + this.entryCode
	}

	getAlgoritmName(){
		let {algoritmName, codeLeft} =  new HeaderHandler(this.entryCode).handle()

		this.entryCode = codeLeft
		return algoritmName
	}

	getVariables(){
		let {variables, codeLeft} =  new VariablesHandler(this.entryCode).handle()
		this.entryCode = codeLeft
		return variables
	}
}