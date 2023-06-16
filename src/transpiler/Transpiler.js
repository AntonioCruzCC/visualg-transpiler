import CodeBodyHandler from "./codeBodyHandler/CodeBodyHandler"
import CommentsHandler from "./commentsHandler/CommentsHandler"
import HeaderHandler from "./headerHandler/HeaderHandler"
import VariablesHandler from "./variablesHandler/VariablesHandler"

export default class Transpiler{

	constructor(entryCode){
		this.entryCode = entryCode
	}

	transpile(){
		this.entryCode = this.entryCode.trimLeft()
		this.entryCode = new CommentsHandler(this.entryCode).handle()
		const algoritmName = this.getAlgoritmName()
		const variables = this.getVariables()
		const codeBody = new CodeBodyHandler(this.entryCode, variables).handle()
		//using string join, create a variable exitCode, joining the algoritmName, variables and the entryCode
		let exitCode = [this.buildAlgoritmNameOnTargetLanguage(algoritmName), this.buildVariablesOnTargetLanguage(variables), codeBody].join('\n\n')
		return exitCode
	}

	buildAlgoritmNameOnTargetLanguage(algoritmName){
		return '//Algoritmo: ' + algoritmName
	}

	buildVariablesOnTargetLanguage(variables){
		if(variables.length >= 1)
			return 'let ' + variables.join(', ')
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