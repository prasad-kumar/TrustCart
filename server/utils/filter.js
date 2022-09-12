

class FilterProducts{
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){

        const keyword = this.queryStr.keyword ? {
            name: {
                $regex : this.queryStr.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find(keyword);
        return this;
    }

    filter(){
        const queryStrCopy = {...this.queryStr}

        // removeing unwanted queries
        const removeFields = ["keyword", "limit", "page"]
        removeFields.forEach( key => delete queryStrCopy[key])

        // price filtering
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resultsPerPage){
        const curPage = this.queryStr.page || 1;
        const skip = resultsPerPage * (curPage - 1);

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = FilterProducts;