export default function movies(parent, args, { prisma }, info) {
  return prisma.query.movies(null, info);
}
