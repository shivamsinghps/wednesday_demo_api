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
    202: {
      description: 'Users loggedin (credentials accepted)',
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
    404: {
      description: 'User Not Found',
      schema: {
        type: 'string',
        description: 'User Does not exists',
      },
    },
    409: {
      description: 'Conflict',
      schema: {
        type: 'string',
        items: {
          message: {
            type: 'string',
            description: 'user credentials conflict',
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
  summary: 'Add a new user',
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
      description: 'User Already exists',
      schema: {
        type: 'string',
        items: {
          message: {
            type: 'string',
            description: 'user email id already present',
          },

        },
      },
    },
    500: {
      description: 'Server Error',
      schema: {
        type: 'string',
        items: {
          message: {
            type: 'string',
            description: 'Error processing the request from host db',
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
