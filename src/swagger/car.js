const get_nearby_car = {
  tags: ['Cars'],
  description: 'Returns the cars near by location',
  operationId: 'getcars',
  parameters: [{
    in: 'query',
    name: 'lng',
    required: true,
    schema: {
      type: 'number',
      description: 'longitude of user',
    },
  }, {
    in: 'query',
    name: 'lat',
    required: true,
    schema: {
      type: 'number',
      description: 'longitude of user',
    },
  },
  {
    in: 'query',
    name: 'maxDistance',
    required: true,
    schema: {
      type: 'number',
      description: 'max distance of car from user',
    },
  },
  ],
  security: [{
    bearerAuth: [],
  }],
  responses: {
    200: {
      description: 'A list of cars.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
          },
        },
      },
    },
  },
};


module.exports = {
  get_nearby_car,
};
