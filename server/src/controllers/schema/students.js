var Validator = require('jsonschema').Validator;
var v = new Validator();

studentCreateSchema = {
  id: '/Student',
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    ra: { type: 'string' },
    cpf: { type: 'string' },
  },
  required: [],
};

const required = {
  create: () => {
    studentCreateSchema.required = ['name', 'email', 'ra', 'cpf'];
  },
  edit: () => {
    studentCreateSchema.required = ['name', 'email'];
  },
};

/**
 * @param {object} body {name, email, ra, cpf}
 * @param {string} type 'create' | 'edit'
 */

module.exports = () => {
  return {
    body: (instance) => {
      return {
        type: (type) => {
          const errors = [];

          required[type]();

          v.addSchema(studentCreateSchema, '/Student');

          const result = v.validate(instance, studentCreateSchema);

          if (!result.valid) {
            result.errors.map((error) => {
              errors.push(error.argument.toUpperCase());
            });

            throw errors.length === 1
              ? `Campo: ${errors} não preenchido.`
              : `Campos: ${errors.join(', ')} não preenchidos.`;
          }
        },
      };
    },
  };
};
