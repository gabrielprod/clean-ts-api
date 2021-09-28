export const unauthorized = {
  description: 'Credenciais Inválidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
