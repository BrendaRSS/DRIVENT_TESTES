import { prisma } from "@/config";

async function getHotels() {
  return await prisma.hotel.findMany();
}

async function getRoomsHotel(id: number) {
  return await prisma.hotel.findFirst({
    where: {
      id: id,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  getHotels,
  getRoomsHotel
};

export default hotelsRepository;
