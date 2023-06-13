import AttributionParser from "../statementParsers/AttributionParser"
import ConditionalParser from "../statementParsers/ConditionalParser"
import ForParser from "../statementParsers/ForParser"
import ReadParser from "../statementParsers/ReadParser"
import WhileParser from "../statementParsers/WhileParser"
import WriteParser from "../statementParsers/WriteParser"

export default class CodeBodyHandler{
	
	constructor(entryCode, variables){
		this.parsers = [AttributionParser, ConditionalParser, ReadParser, WriteParser, WhileParser, ForParser]
		this.entryCode = entryCode
		this.variables = variables
		this.outputCode = ''
	}

	handle(){
		//check if the first word is "inicio" ignoring the case, if it is remove it and trim the white space on the left
		if(!/^inicio\s*/gi.test(this.entryCode)){
			throw Error('Palavra reservada "inicio" não encontrada')
		}else{
			this.entryCode = this.entryCode.replace(/^inicio\s*/gi, '').trimLeft()
			this.outputCode = '//Inicio do corpo de código\n\n'
			this.handleCodeBody()
		}
		return this.outputCode
	}

	handleCodeBody(){
		//divide the code in statements
		const statements = this.entryCode.split('\n')
		statements.forEach(statement => {
			if(statement.trim().toLowerCase() === 'fimalgoritmo'){
				this.outputCode += '//Fim do corpo de código'
				return
			}
			this.determineTypeOfStatement(statement)
		});

	}

	determineTypeOfStatement(statement){
		for(let parser of this.parsers){
			try{
				const outputStatement = Reflect.construct(parser, [statement, this.variables]).parse()
				this.outputCode += outputStatement + '\n'
				return
			}catch(e){
				if(e.code === 'InvalidParser')
					console.log(e.message)
				else
					throw Error(e.message)
			}
		}
		throw Error('Comando: ' + statement + ' inválido')
	}
}