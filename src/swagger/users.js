const signuser = {
  tags: [
    'User',
  ],
  summary: 'login the user',
  description: '',
  operationId: 'log_in_User',
  consumes: [
    'application/json',
    'application/xml',
  ],
  produces: [
    'application/xml',
    'application/json',
  ],
  requestBody: {
    description: 'Existing User Email and Password',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Users loggedin',
      schema: {
        type: 'object',
        items: {
          message: {
            type: 'string',
            description: 'auth status',
          },
          token: {
            type: 'string',
            description: 'token for auth',
          },
        },
      },

    },
    409: {
      description: 'Invalid input',
      schema: {
        type: 'string',
        items: {
          message: {
            type: 'string',
            description: 'user email id exists',
          },

        },
      },
    },
  },
};

const postuser = {
  tags: [
    'User',
  ],
  summary: 'Add a new user to the store',
  requestBody: {
    description: 'Cat Object',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            user_name: {
              type: 'string',
            },
            contact_no: {
              type: 'number',
            },
          },
        },
      },
    },
  },
  produces: [
    'application/xml',
    'application/json',
  ],
  responses: {
    201: {
      description: 'Users created',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'user stats',
          },
        },
      },

    },
    409: {
      description: 'Invalid input',
      schema: {
        type: 'string',
        items: {
          message: {
            type: 'string',
            description: 'user email id exists',
          },

        },
      },
    },
  },
};


module.exports = {
  postuser,
  signuser,
};
