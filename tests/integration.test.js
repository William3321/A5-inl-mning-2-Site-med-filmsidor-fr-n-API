import supertest from 'supertest';
import app from '../server.js'; // Ange rätt sökväg till din serverfil
import * as chai from 'chai';

const request = supertest(app);
const expect = chai.expect;

describe('Filmsidor', () => {
  it('ID 1 is showing the correct title', async () => {
    const response = await request.get('/movies/1');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>Isle of dogs Details</h1>');
  });

  it('ID 2 is showing the correct title', async () => {
    const response = await request.get('/movies/2');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>Encanto Details</h1>');
  });

  it('ID 3 is showing the correct title', async () => {
    const response = await request.get('/movies/3');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>The Shawshank Redemption Details</h1>');
  });

  it('ID 4 is showing the correct title', async () => {
    const response = await request.get('/movies/4');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>Min granne Totoro Details</h1>');
  });

  it('ID 5 is showing the correct title', async () => {
    const response = await request.get('/movies/5');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>The Muppets Details</h1>');
  });

  it('ID 6 is showing the correct title', async () => {
    const response = await request.get('/movies/6');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>Forrest Gump Details</h1>');
  });

  it('ID 8 is showing the correct title', async () => {
    const response = await request.get('/movies/8');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('<h1>Pulp Fiction Details</h1>');
  });

  // Lägg till fler tester för andra filmer
});