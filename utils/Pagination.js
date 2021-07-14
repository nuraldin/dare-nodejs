class Pagination {
  constructor(data, limit = 10) {
    this.data = data;
    this.limit = limit;
  }

  getPage(page_number = 1) {
    let page;
    if ( this.data.length > this.limit ) {
      page = this.data.slice((page_number - 1) * this.limit , page_number * this.limit );
    } else {
      page = this.data;
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