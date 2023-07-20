import mercadopago from "mercadopago";
import Race from "../models/Race";
import RegisterData from "../models/RegisterData";
import DiscountCode from "../models/DiscountCodes";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

export const payProduct = async (req, res) => {
  const raceId = req.params.id; // se pasa el ID de la carrera como parámetro en la URL
  const { discountCode, price, successUrl, failureUrl, pendingUrl } = req.body;

  try {
    // Obtener la información del producto desde la base de datos
    const product = await Race.findById(raceId);

    // Verificar si el producto está disponible y tiene un precio
    if (!product.info.available || !product.info.price) {
      throw new Error("El producto no está disponible para la compra");
    }

    // Crear el objeto de preferencia de pago
    const preference = {
      items: [
        {
          title: product.name,
          description: product.description,
          unit_price: price,
          quantity: 1,
        },
      ],
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      auto_return: "approved",
    };

    // Crear la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    // Obtener el link de pago generado
    const paymentLink = response.body.init_point;

    // Obtener la distancia de la carrera en kilómetros
    const distance = parseInt(product.info.distance);

    // Actualizar la estadística de usuarios pagados por kilómetro
    await RegisterData.updateOne(
      {},
      { $inc: { [`registeredPayments.${distance}`]: 1 } }
    );

    discountCode &&
      (await DiscountCode.findOneAndDelete({ code: discountCode }));

    // Retornar el link de pago
    res.send(paymentLink);
  } catch (error) {
    console.error("Error al generar el pago:", error);
    throw error;
  }
};
