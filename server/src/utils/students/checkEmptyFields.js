exports.Check = async (fields) => {
  let emptyFields = [];

  for await (const field of fields) {
    if (!field.value) {
      emptyFields.push(field.prop.toUpperCase());
    }
  }

  if (emptyFields.length) {
    throw emptyFields.length === 1
      ? `Campo: ${emptyFields} não preenchido.`
      : `Campos: ${emptyFields.join(', ')} não preenchidos.`;
  }
};
