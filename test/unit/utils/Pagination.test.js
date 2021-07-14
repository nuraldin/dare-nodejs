import chai from 'chai';
import Pagination from '../../../src/utils/Pagination.js';

const assert = chai.assert;
const expect = chai.expect;

describe('Pagination.js', function() {
  it('should fail if page_number is less than 1', () => {
    let pagination = new Pagination();

    expect( () => pagination.getPage(-1) ).to.throw();
  });
  
  it('should fail if page_number is referencing to null page', () => {
    let mockData = [ 'policy1', 'policy2' ];
    let pagination = new Pagination(mockData, 1);

    expect( () => pagination.getPage(32) ).to.throw();
  });
  
  it('should create page correctly if passing correct arguments', () => {
    let mockData = [ 'policy1', 'policy2' ];
    let pagination = new Pagination(mockData, 1);
    let page = pagination.getPage(1);
    
    assert.equal(page.items_count, 1);
    assert.equal(page.total_items, 2);
    assert.equal(page.pages, 2);
    assert.equal(page.page_number, 1);
    assert.equal(page.items[0], 'policy1');
  });
});