import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket) {
    throw notFoundError();
  }

  if(ticket.status !== "PAID") {
    throw unauthorizedError();
  }

  if(ticket.TicketType.isRemote===true) {
    throw unauthorizedError();
  }

  if(ticket.TicketType.includesHotel=== false) {
    throw unauthorizedError();
  }

  const hotels = await hotelsRepository.getHotels();

  return hotels;
}

async function getRoomsHotel(id: number, userId: number) {
  await getHotels(userId);

  const hotelWithRooms = await hotelsRepository.getRoomsHotel(id);
  if(!hotelWithRooms) {
    throw notFoundError();
  }

  return hotelWithRooms;
}

const hotelsService = {
  getHotels,
  getRoomsHotel
};

export default hotelsService;
