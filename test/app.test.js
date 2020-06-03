const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps',()=>{
  it('outputs and array of objects',()=>{
    return supertest(app)
      .get('/apps')
      .query(null)
      .expect(200)
      .expect('Content-Type',/json/)
      .then(res=>{
        expect(res.body).to.be.an('array');
        res.body.length>0?expect(res.body[0]).to.be.an('object'):null;
        res.body.length>0?expect(Object.keys(res.body[0])).to.have.members(['App','Category','Rating','Reviews','Size','Installs','Type','Price','Content Rating','Genres','Last Updated','Current Ver','Android Ver']):null;
      });
  });
  it('sort errors when sort contains parameter other than "rating" or "app"',()=>{
    return supertest(app)
      .get('/apps')
      .query({sort:'rating'})
      .expect(400, 'Please provide a sort value in Proper format');
  });

  it('sort rating query sorts data appropriately',()=>{
    return supertest(app)
      .get('/apps')
      .query({sort:'Rating'})
      .expect(200)
      .expect('Content-Type',/json/)
      .then(res=>{
        expect(res.body[0]).to.be.eql({
          "App": "ROBLOX",
          "Category": "GAME",
          "Rating": 4.5,
          "Reviews": "4447388",
          "Size": "67M",
          "Installs": "100,000,000+",
          "Type": "Free",
          "Price": "0",
          "Content Rating": "Everyone 10+",
          "Genres": "Adventure;Action & Adventure",
          "Last Updated": "July 31, 2018",
          "Current Ver": "2.347.225742",
          "Android Ver": "4.1 and up"});
      });
  });
  it('sort app query sorts data appropriately',()=>{
    return supertest(app)
      .get('/apps')
      .query({sort:'App'})
      .expect(200)
      .expect('Content-Type',/json/)
      .then(res=>{
        expect(res.body[0]).to.be.eql({
          "App": "ROBLOX",
          "Category": "GAME",
          "Rating": 4.5,
          "Reviews": "4447388",
          "Size": "67M",
          "Installs": "100,000,000+",
          "Type": "Free",
          "Price": "0",
          "Content Rating": "Everyone 10+",
          "Genres": "Adventure;Action & Adventure",
          "Last Updated": "July 31, 2018",
          "Current Ver": "2.347.225742",
          "Android Ver": "4.1 and up"});
      });
  });

  it('genre filter value is of the valid values',()=>{
    return supertest(app)
      .get('/apps')
      .query({genres:'Fantasy'})
      .expect(400,'Please provide a valid genre value in Proper format');
  });
  it('verifies that the genre filter works appropriately',()=>{
    return supertest(app)
      .get('/apps')
      .query({genres:'Casual'})
      .expect(200)
      .expect('Content-type',/json/)
      .then(res=>{
        expect(res.body[0]).to.be.eql({
          "App": "Candy Crush Saga",
          "Category": "GAME",
          "Rating": 4.4,
          "Reviews": "22426677",
          "Size": "74M",
          "Installs": "500,000,000+",
          "Type": "Free",
          "Price": "0",
          "Content Rating": "Everyone",
          "Genres": "Casual",
          "Last Updated": "July 5, 2018",
          "Current Ver": "1.129.0.2",
          "Android Ver": "4.1 and up"});
      });
  });
});