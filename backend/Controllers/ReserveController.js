const  ReserveModel=require ("../Models/Reservation");
const  jwt =require ('jsonwebtoken');
const bcrypt =require ('bcrypt');
const validator =require ('validator');
const TableModel = require("../Models/Table");
const frontend_url='http://localhost:5173'
const stripe = require('stripe')('sk_test_51RBMXo4FlSbelSuKp15qkCFl65CTopoEuNZcQ5pIjYp0rJjoHazQIQkaunaimiOvL6enfref6slxKJRmfvx11w1q003oe4GUPp');  // Remplace par ta clé secrète Stripe

const getAll=async(req,res)=>{
  
    try{
        const reservations=await ReserveModel.find().populate('tables')
        res.json(reservations)
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Reservations', error });
      }
}
const createCheckoutSession = async (req, res) => {
  try {
    const user = req.params.id;
    const { date, time, tables, people, additional } = req.body
    console.log(req.body)
    if (!tables || !time || !date || !people) {
      return res.status(400).json({ message: "All fields are required." });
    }
      const reservationDate = new Date(date);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
    
            // Validation: La date doit être demain ou plus tard
            if (reservationDate < tomorrow.setHours(0, 0, 0, 0)) {
              console.log("Date invalide pour la réservation");
              return res.status(400).send('Invalid reservation date');
            }
    
            // Vérification: Les tables ne sont pas déjà réservées à ce moment-là
            const existingReservations = await ReserveModel.find({ tables: { $in: tables }, time, date });
            if (existingReservations.length > 0) {
              console.log("Les tables sont déjà réservées pour ce moment.");
              return res.status(400).send('Tables already reserved');
            }
    
            // Création du début et de la fin de réservation
            const reservationStart = new Date(`${date}T${time}`);
            const reservationEnd = new Date(reservationStart.getTime() + 2 * 60 * 60 * 1000); // +2 heures
    
            // Vérifier que le même user n'a pas déjà une réservation qui croise ce créneau
            const userReservations = await ReserveModel.find({ user, date });
    
            for (const r of userReservations) {
              const existingStart = new Date(`${r.date}T${r.time}`);
              const existingEnd = new Date(existingStart.getTime() + 2 * 60 * 60 * 1000);
    
              if (
                (reservationStart >= existingStart && reservationStart < existingEnd) ||
                (reservationEnd > existingStart && reservationEnd <= existingEnd) ||
                (reservationStart <= existingStart && reservationEnd >= existingEnd)
              ) {
                console.log("Conflit avec une autre réservation de l'utilisateur.");
                return res.status(400).send('User already has a reservation at this time');
              }
            }
    
            // Vérification: somme des sièges
            const selectedTables = await TableModel.find({ _id: { $in: tables } });
            const totalSeats = selectedTables.reduce((sum, table) => sum + table.chairs, 0);
    
            if (people > totalSeats) {
              console.log("Not enough chairs.");
              return res.status(400).send('Not enough seats for the number of people');
            }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${frontend_url}/my`,
      cancel_url: `${frontend_url}/reservation`,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Reservation for ${people} people`,
            },
            unit_amount: 1000, // par exemple 10€ pour la réservation
          },
          quantity: 1,
        },
      ],
      metadata: {
        user,
        date,
        time,
        people,
        additional: additional || '',
        tables: JSON.stringify(tables), // il faut convertir les tableaux en string
      }
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




const makereserve = async (req, res) => {
 
  try {
    const user = req.params.id;
    const { date, time, tables, people, additional } = req.body;

    // Validation
    if (!tables || !time || !date || !people) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1)); // Ajouter 1 jour à la date d'aujourd'hui
    
    const reservationDate = new Date(date);
    
    if (reservationDate < tomorrow.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "Reservation date must be tomorrow or later." });
    }
    let filter = { tables, time, date };

    // Check if tables are already reserved at the same time and date
    const existingReservations = await ReserveModel.find(filter);
    if (existingReservations.length > 0) {
      return res.status(400).json({ message: "Reservation at this time and date already exists." });
    }

    // Create start and end time of the reservation
    const reservationStart = new Date(`${date}T${time}`);
    const reservationEnd = new Date(reservationStart.getTime() + 2 * 60 * 60 * 1000); // +2 hours
    
    console.log(reservationStart)
    console.log(reservationEnd)
    // Check if the same user already has another reservation at the same time
    const userReservations = await ReserveModel.find({ user, date });

    for (const r of userReservations) {
      const existingStart = new Date(`${r.date}T${r.time}`);
      const existingEnd = new Date(existingStart.getTime() + 2 * 60 * 60 * 1000);

      if (
        (reservationStart >= existingStart && reservationStart < existingEnd) || 
        (reservationEnd > existingStart && reservationEnd <= existingEnd) ||
        (reservationStart <= existingStart && reservationEnd >= existingEnd)
      ) {
        return res.status(400).json({ message: "You already have another reservation at this time." });
      }
    }
      // Nouvelle vérification: somme des chaises
      const selectedTables = await TableModel.find({ _id: { $in: tables } });

      const totalSeats = selectedTables.reduce((sum, table) => sum + table.chairs, 0);
      console.log(totalSeats)
      if (people > totalSeats) {
        return res.status(400).json({
          message: `The number of people (${people}) exceeds the total available seats (${totalSeats}) for the selected tables.`,
        });
      }
    // Create new reservation
    const newReservation = new ReserveModel({
      tables,
      time,
      date,
      people,
      additional,
      user
    });
   
      

    await newReservation.save();

    // Update reserved tables
    await Promise.all(
      tables.map(async (tableId) => {
        await TableModel.findByIdAndUpdate(tableId, { reserved: true, reservedUntil: reservationEnd });
      })
    );
   
    res.status(201).json({ 
      message: "Reservation created successfully. For more information, check your reservations page.",
      newReservation
    });
  


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params; // ID of the reservation

    // Find the reservation
    const reservation = await ReserveModel.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // Free the reserved tables
    await Promise.all(
      reservation.tables.map(async (tableId) => {
        await TableModel.findByIdAndUpdate(tableId, {
          reserved: false,
          reservedUntil: null
        });
      })
    );

    // Delete the reservation
    await ReserveModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Reservation deleted successfully." });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

  
  const GetUsersReservations=async(req,res)=>{
    try {
        const user = req.params.id;
        const reservation=await ReserveModel.find({user:user}).populate('tables')
        if (!reservation) {
            return res.status(400).json({ message: "No Reservations yet." });
          }
          res.status(200).json(reservation);

    } 
        catch (error) {
            console.error(error); // Pour logguer l'erreur dans la console du serveur
            res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
          }
    }

    const cancelReservation = async (req, res) => {
      try {
        const { id } = req.params;
    
        // Recherche de la réservation
        const reservation = await ReserveModel.findById(id);
        if (!reservation) {
          return res.status(404).json({ message: "Reservation not found." });
        }
    
        const reservationDate = new Date(`${reservation.date}T${reservation.time}`);
        const currentDate = new Date();
    
        // Si la réservation est dans moins de 24h, on peut l'annuler
        if (reservationDate - currentDate < 24 * 60 * 60 * 1000) {
          return res.status(400).json({ message: "You can cancel the reservation only if it's more than 24 hours in advance." });
        }
    
        // Libération des tables réservées
        await Promise.all(
          reservation.tables.map(async (tableId) => {
            await TableModel.findByIdAndUpdate(tableId, { reserved: false, reservedUntil:null });
          })
        );
    
        // Marquer la réservation comme annulée
        reservation.status = "cancelled";
        await reservation.save();
    
        res.status(200).json({ message: "Reservation cancelled successfully." });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred while cancelling the reservation.", error: error.message });
      }
    };
    const endReservation = async (req, res) => {
      try {
        const { id } = req.params;
    
        // Recherche de la réservation
        const reservation = await ReserveModel.findById(id);
        if (!reservation) {
          return res.status(404).json({ message: "Reservation not found." });
        }
    
        // Vérifier si la réservation est en cours (avant la fin du temps)
        const reservationStart = new Date(`${reservation.date}T${reservation.time}`);
        const reservedUntil = new Date(reservationStart.getTime() + 2 * 60 * 60 * 1000); // Ajouter 2h à l'heure de début
    
        const currentDate = new Date();
    
        // Vérifier si la réservation est en cours
        if (currentDate >= reservationStart && currentDate < reservedUntil) {
          // Libérer les tables
          await Promise.all(
            reservation.tables.map(async (tableId) => {
              await TableModel.findByIdAndUpdate(tableId, { reserved: false, reservedUntil:null });
            })
          );
    
          // Marquer la réservation comme terminée
          reservation.status = "ended";
          await reservation.save();
    
          res.status(200).json({ message: "Reservation ended early and tables are now available." });
        } else {
          res.status(400).json({
            message: "Reservation is either already ended or not started yet."
          });
        }
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred while ending the reservation.", error: error.message });
      }
    };
    
    

module.exports={getAll,makereserve,createCheckoutSession,GetUsersReservations,endReservation,cancelReservation,deleteReservation}