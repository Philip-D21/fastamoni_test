const {Op} = require("sequelize");

class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt|in)\b/g,
        (match) => `$${match}`
      );
  
      let parsedQuery = JSON.parse(queryStr);
  
      // Modified query so that it can use LIKE operator
      if (parsedQuery.search) {
        let search = parsedQuery.search;
  
        parsedQuery.$or = [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            content: {
              [Op.like]: `%${search}%`,
            },
          },
        ];
  
        delete parsedQuery.search;
      }
  
      this.query.where = parsedQuery;
  
      return this;
    }
  
    sort() {
        if (this.queryString.sort) {
          const sortBy = this.queryString.sort.split(",").join(" ");
          this.query.order = sortBy; // Use 'order' property instead of 'orderBy()' function
        } else {
          // Sort by title and content in ascending order
          this.query.order = [['title', 'ASC'], ['content', 'ASC']];
        }
      
        return this;
      }
      
      limitFields() {
        if (this.queryString.fields) {
          const fields = this.queryString.fields.split(",");
          this.query.attributes = fields; // Use 'attributes' property instead of 'select()' function
        } else {
          this.query.attributes = undefined; // Select all fields
        }
      
        return this;
      }
      
  
      paginate() {
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 20;
        const offset = (page - 1) * limit;
    
        this.query = this.query.slice(offset, offset + limit);
        this.query.limit = offset ;
    
        return this;
      }
  }
  




  

module.exports = APIFeatures;
  