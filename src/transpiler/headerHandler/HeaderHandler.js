
export default class HeaderHandler{
	constructor(entryCode){
		this.entryCode = entryCode
	}

	handle(){
		let algoritmName
		//test if first word is "algoritmo" ignoring the case
		if(!/^algoritmo\s*/gi.test(this.entryCode)){
			algoritmName = 'Sem Nome'
		}else{
			algoritmName = this.getAlgoritmName()
		}
		return {
				algoritmName: algoritmName,
				codeLeft: this.entryCode
		}
	}
	/*check if after "algoritmo" ignoring the case there is a name inside of quotes and get it,
	if there is not throw an error, also get the index of the closing quote, the algoritm name can be empty*/
	getAlgoritmName() {
		const regex = /algoritmo\s*["']([^"']*)["']/gi
		const match = regex.exec(this.entryCode)
		if (match) {
			this.entryCode = this.entryCode.replace(regex, '').trimLeft()
			return match[1]
		} else {
			throw new Error('Nome do algoritmo não encontrado')
		}
	}
}