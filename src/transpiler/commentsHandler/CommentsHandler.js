
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
        return this.entryCode
    }

    handleSingleLineComments(){
        const singleLineCommentsRegex = /\/\/.*\n/gi
        let match = singleLineCommentsRegex.exec(this.entryCode)
        while(match){
            this.entryCode = this.entryCode.replace(match[0], '')
            match = singleLineCommentsRegex.exec(this.entryCode)
        }
        return this.entryCode
    }

    handleMultiLineComments(){
        const commentsRegex = /\/\*[\s\S]*?\*\//gi
        let match = commentsRegex.exec(this.entryCode)
        while(match){
            this.entryCode = this.entryCode.replace(match[0], '')
            console.log()
            match = commentsRegex.exec(this.entryCode)
        }
        return this.entryCode
    }

}