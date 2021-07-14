class Pagination {
  constructor(data, limit = 10) {
    this.data = data;
    this.limit = limit;
  }

  getPage(page_number = 1) {
    if ( page_number < 1) {
      throw new Error('page number must be positive');
    }

    let page = this.data;
    if ( page.length > this.limit ) {
      page = page.slice((page_number - 1) * this.limit , page_number * this.limit );
      if ( page.length == 0) {
        throw new Error('page number references invalid page');
      } 
    }    
    
    return {
      page_number: page_number,
      pages: Math.ceil( this.data.length / this.limit ),
      total_items: this.data.length,
      items_count: page.length,
      items: page
    }
  }
}

export default Pagination;