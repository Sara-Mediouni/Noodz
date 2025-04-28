const cron = require('node-cron');
const ReserveModel = require('./models/ReserveModel'); // Assure-toi d'importer ton modèle de réservation
const TableModel = require('./models/TableModel'); // Assure-toi d'importer ton modèle de table

// Créer une tâche cron qui s'exécute toutes les heures
cron.schedule('0 * * * *', async () => {
  try {
    // Récupérer les réservations dont la date de fin est passée (réservation déjà terminée)
    const now = new Date();

    // Chercher les réservations terminées
    const finishedReservations = await ReserveModel.find({
      status: { $ne: 'ended' },  // Assure-toi de ne pas modifier celles déjà terminées
      reservedUntil: { $lt: now }, // Date de fin passée
    });

    // Libérer les tables associées et mettre à jour le statut
    if (finishedReservations.length > 0) {
      for (let reservation of finishedReservations) {
        // Libérer les tables
        await Promise.all(
          reservation.tables.map(async (tableId) => {
            // Libérer la table
            await TableModel.findByIdAndUpdate(tableId, { reserved: false });
          })
        );

        // Mettre à jour la réservation à "ended"
        reservation.status = 'ended';
        await reservation.save();

        console.log(`Reservation ${reservation._id} ended and tables freed.`);
      }
    }

    console.log('Cron job executed successfully');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});
