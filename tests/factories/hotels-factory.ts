import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotels() {
  return prisma.hotel.create({
    data: {
      id: 40000,
      name: faker.name.findName(),
      image: "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg"
    },
  });
}

export async function createRooms(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 4,
      hotelId: hotelId
    },
  });
}
