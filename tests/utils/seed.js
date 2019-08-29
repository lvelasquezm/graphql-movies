import prisma from '../../src/prisma';

export default async () => {
  // Delete all users, movies and persons from the test DB
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.deleteManyMovies();
  await prisma.mutation.deleteManyPersons();

  // Create mock movies on the test DB
  const titanic = await prisma.mutation.createMovie({
    data: {
      title: "Titanic",
      year: 1998,
      rating: 7,
      scoutbase_rating: 6
    }
  });
  const theMartian = await prisma.mutation.createMovie({
    data: {
      title: "The Martian",
      year: 2018,
      rating: 8,
      scoutbase_rating: 8
    }
  });

  // Create mock persons (actors and directors) on the test DB
  await prisma.mutation.createPerson({
    data: {
      name: "Leo Di Caprio",
      country: "United States",
      moviesPlayed: {
        connect: {
          id: titanic.id
        }
      }
    }
  });
  await prisma.mutation.createPerson({
    data: {
      name: "Kate Winslet",
      country: "United States",
      birthday: "1975-10-05",
      moviesPlayed: {
        connect: {
          id: titanic.id
        }
      }
    }
  });
  await prisma.mutation.createPerson({
    data: {
      name: "James Cameron",
      country: "United States",
      birthday: "1954-08-16",
      moviesDirected: {
        connect: {
          id: titanic.id
        }
      }
    }
  });
  await prisma.mutation.createPerson({
    data: {
      name: "Matt Damon",
      country: "United States",
      birthday: "1970-10-08",
      moviesPlayed: {
        connect: {
          id: theMartian.id
        }
      },
      moviesDirected: {
        connect: {
          id: theMartian.id
        }
      }
    }
  });
  await prisma.mutation.createPerson({
    data: {
      name: "Jessica Chastain",
      country: "United States",
      birthday: "1977-03-24",
      moviesPlayed: {
        connect: {
          id: theMartian.id
        }
      }
    }
  });
  await prisma.mutation.createPerson({
    data: {
      name: "Ridley Scott",
      country: "England",
      birthday: "1937-11-30",
      moviesDirected: {
        connect: {
          id: theMartian.id
        }
      }
    }
  });
};
