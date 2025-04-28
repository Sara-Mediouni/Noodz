const stripe = require('stripe')(process.env.STRIPE_API_KEY);  // Remplace par ta clé secrète Stripe
const ReserveModel = require('../Models/Reservation');
const TableModel = require('../Models/Table');


const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    console.log('Received a webhook');
    console.log('Headers:', req.headers);
    console.log('Body:', req.rawBody?.toString());
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      if (session.payment_status === 'paid') {
        const { user, tables, date, time, people, additional } = session.metadata;

      {/*  const reservationDate = new Date(date);
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
        }*/}

        // ✅ Tout est bon -> On crée la réservation
        const newReservation = new ReserveModel({
          tables,
          time,
          date,
          people,
          additional,
          user
        });

        await newReservation.save();

        // Marquer les tables comme réservées
        await Promise.all(
          tables.map(async (tableId) => {
            await TableModel.findByIdAndUpdate(tableId, { reserved: true, reservedUntil: reservationEnd });
          })
        );

        console.log('Reservation created successfully!');
        return res.status(200).send('Reservation created successfully');
      }
    }

  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { stripeWebhook };
