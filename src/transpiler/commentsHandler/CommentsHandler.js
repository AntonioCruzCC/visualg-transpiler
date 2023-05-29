
export default class CommentsHandler{
    constructor(entryCode){
        this.entryCode = entryCode
    }

    handle(){
        return this.removeComentsFromEntryCode()
    }

    removeComentsFromEntryCode(){
        this.entryCode = this.handleSingleLineComments()
        this.entryCode = this.handleMultiLineComments()
        this.entryCode = this.removeExtraLineBreaks()
        return this.entryCode
    }

    handleSingleLineComments(){
        const singleLineCommentsRegex = /\/\/.*\n/
        return this.replaceIfMatch(singleLineCommentsRegex, '')
    }

    handleMultiLineComments(){
        const multilineCommentsRegex = /\/\*[\s\S]*?\*\//
        return this.replaceIfMatch(multilineCommentsRegex, '')
    }

    removeExtraLineBreaks(){
        const lineBreakeRegex = /\n\n+/
        return this.replaceIfMatch(lineBreakeRegex, '\n')
    }

    replaceIfMatch(regex, replaceValue){
        let match = regex.exec(this.entryCode)
        while(match){
            this.entryCode = this.entryCode.replace(match[0], replaceValue)
            match = regex.exec(this.entryCode)
        }
        return this.entryCode
    }

}