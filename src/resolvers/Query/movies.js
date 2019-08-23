import uuidv4 from 'uuid/v4';

export default function movies(parent, args, ctx, info) {
  return [
    {
      id: uuidv4(),
      title: 'Titanic',
      year: 1998,
      rating: 6.5,
      actors: [
        {
          id: uuidv4(),
          name: 'Leo Di Caprio',
          country: 'US'
        },
        {
          id: uuidv4(),
          name: 'Kate Winslet',
          country: 'US',
          birthday: 'Do not know'
        }
      ],
      directors: [
        {
          id: uuidv4(),
          name: 'James Cameron',
          country: 'US',
        }
      ]
    }
  ];
}
