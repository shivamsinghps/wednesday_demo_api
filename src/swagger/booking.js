const getuserbookings = {
  tags: ['Bookings'],
  description: 'Returns the bookings list to the user',
  operationId: 'getcars',
  security: [{
    bearerAuth: [],
  }],
  produces: [
    'application/xml',
    'application/json',
  ],
  responses: {
    200: {
      description: 'List of Bookings',
      schema: {
        type: 'array',
        description: 'list of user bookings',
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

const makebookings = {
  tags: [
    'Bookings',
  ],
  summary: 'Add a new Booking',
  parameters: [{
    in: 'query',
    name: 'maxDistance',
    required: true,
    schema: {
      type: 'number',
      description: 'max distance of car from user',
    },
  }],
  security: [{
    bearerAuth: [],
  }],
  requestBody: {
    description: 'New Booking Object',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            initial_loc: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            final_loc: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            booking_amt: {
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
      description: 'Booking created',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Booking Status',
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
  getuserbookings,
  makebookings,
};
