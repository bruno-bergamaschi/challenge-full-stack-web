const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

describe('Test Create students', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should be created a student if have all and correct properties', async () => {
    const result = await request(app).post('/students/create').send({
      name: 'João Roberto',
      email: 'joãoroberto@gmail.com.br',
      ra: '202212345',
      cpf: '00011122233',
    });

    expect(result.body).toHaveProperty('msg');
    expect(result.body.msg).toBe('Cadastro realizado com sucesso.');
    expect(result.status).toBe(200);
  });

  it('should not be created a student if not have all properties', async () => {
    const result = await request(app).post('/students/create').send({
      name: 'Bianca Rosa',
      email: 'biancarosa@gmail.com.br',
      ra: '202223423',
    });

    expect(result.body).toHaveProperty('msg');
    expect(result.body).toHaveProperty('error');
    expect(result.body.msg).toBe('Algo deu errado. Cadastro não realizado.');
    expect(result.body.error).toBe('Campo: CPF não preenchido.');
    expect(result.status).toBe(400);
  });

  it('should not be created a student if RA existence', async () => {
    await request(app).post('/students/create').send({
      name: 'Bianca Rosa',
      email: 'biancarosa@gmail.com.br',
      ra: '202223423',
      cpf: '00011122233',
    });

    const result = await request(app).post('/students/create').send({
      name: 'Bianca Rosa',
      email: 'biancarosa@gmail.com.br',
      ra: '202223423',
      cpf: '00011122233',
    });

    expect(result.body).toHaveProperty('msg');
    expect(result.body).toHaveProperty('error');
    expect(result.body.msg).toBe('Algo deu errado. Cadastro não realizado.');
    expect(result.body.error).toBe(
      `RA já cadastrado. Aluno: Bianca Rosa | CPF: 00011122233`
    );
    expect(result.status).toBe(400);
  });
});

describe('Test GetAll students', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should get all students', async () => {
    await request(app)
      .get('/students/get-all')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test Edit students', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be edited a student if have all and correct properties', async () => {
    const student = await request(app).post('/students/create').send({
      name: 'Ricardo Nascimento',
      email: 'ricardonascimento@gmail.com.br',
      ra: '202212345',
      cpf: '00011122233',
    });

    const result = await request(app)
      .patch(`/students/update/${student.body.student.id}`)
      .send({
        name: 'Ricardo Muller',
        email: 'ricardomuller@gmail.com.br',
      });

    expect(result.body).toHaveProperty('msg');
    expect(result.body.msg).toBe('Cadastro atualizado com sucesso.');
    expect(result.status).toBe(200);
  });

  it('should not be edited a student if not have all properties', async () => {
    const student = await request(app).post('/students/create').send({
      name: 'Ricardo Nascimento',
      email: 'ricardonascimento@gmail.com.br',
      ra: '202212345',
      cpf: '00011122233',
    });

    const result = await request(app)
      .patch(`/students/update/${student.body.student.id}`)
      .send({
        name: 'Ricardo Muller',
      });

    expect(result.body).toHaveProperty('msg');
    expect(result.body).toHaveProperty('error');
    expect(result.body.msg).toBe('Algo deu errado. Cadastro não atualizado.');
    expect(result.body.error).toBe('Campo: EMAIL não preenchido.');
    expect(result.status).toBe(400);
  });

  it('should not be edited a student if not exist', async () => {
    const result = await request(app).patch(`/students/update/0`).send({
      name: 'Ricardo Muller',
      email: 'ricardonascimento@gmail.com.br',
    });

    expect(result.body).toHaveProperty('msg');
    expect(result.body).toHaveProperty('error');
    expect(result.body.msg).toBe('Algo deu errado. Cadastro não atualizado.');
    expect(result.body.error).toBe('Cadastro não localizado.');
    expect(result.status).toBe(400);
  });
});

describe('Test Delete students', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be deleted a student', async () => {
    const student = await request(app).post('/students/create').send({
      name: 'Ricardo Nascimento',
      email: 'ricardonascimento@gmail.com.br',
      ra: '202212345',
      cpf: '00011122233',
    });

    const result = await request(app).delete(
      `/students/delete/${student.body.student.id}`
    );

    expect(result.body).toHaveProperty('msg');
    expect(result.body.msg).toBe('Cadastro deletado com sucesso.');
    expect(result.status).toBe(200);
  });

  it('should not be deleted a student if not exist', async () => {
    const result = await request(app).delete(`/students/delete/0`);

    expect(result.body).toHaveProperty('msg');
    expect(result.body).toHaveProperty('error');
    expect(result.body.msg).toBe('Algo deu errado. Cadastro não deletado.');
    expect(result.body.error).toBe('Cadastro não localizado.');
    expect(result.status).toBe(400);
  });
});
