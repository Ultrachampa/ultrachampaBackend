import Fee from "../models/Fee";
import { payFee } from "./mp.controllers";

export const createFee = async (
  feesAmount,
  lastInsertID,
  price,
  description
) => {
  const sale = lastInsertID; //ID de la venta recién ingresada
  let feePrice = Math.round(price / feesAmount, -2); //Obtengo el precio de cada cuota
  var newMonth = 1; //Variable auxiliar que uso para cuando cambie de año

  //Hago un bucle que inserta un registro por cada cuota

  for (let index = 1; index <= feesAmount; index++) {
    const now = new Date(); //fecha de hoy
    let thisMonth = now.getUTCMonth() + index; //obtengo el mes; El método getUTHMonth, comienza con enero = 0, por lo cual le sumo el indice

    if (thisMonth >= 12) {
      //Si la fecha sobrepasa diciembre, es decir, con mes 12, empieza registrar las fechas de venc en el siguiente año
      let expireDate = now.getUTCFullYear() + 1 + "-" + newMonth++ + "-" + 10; //Concateno el string para que el vencimiento sea siempre el día 10 de cada mes
      var title = "Cuota num. " + index;
      var numFee = index;
      //comienzo a insertar el registro en la tabla FEE (cuotas)
      const newFee = new Fee({
        title,
        description,
        sale,
        feePrice,
        expireDate,
        numFee,
      });

      await newFee.save(); //Si todo esta bien, creo el nuevo registro

      if (index < 2) {
        const lastInsertFee = await Fee.find({}).sort({ _id: -1 }).limit(1);
        const lastInsertIDFee = lastInsertFee[0]._id;

        const filterActual = { _id: lastInsertIDFee };
        const updateActual = { isActive: true };
        await Fee.findOneAndUpdate(filterActual, updateActual);
      }
    } else {
      //Si la fecha de venc de cada cuota sigue dentro del mismo año, se ejecuta lo siguiente
      let expireDate = now.getUTCFullYear() + "-" + (thisMonth + 1) + "-" + 10;
      var title = "Cuota num. " + index;
      var numFee = index;

      //comienzo a insertar el registro en la tabla FEE (cuotas)
      const newFee = new Fee({
        title,
        description,
        sale,
        feePrice,
        expireDate,
        numFee,
      });

      await newFee.save(); //Si todo esta bien, creo el nuevo registro

      if (index < 2) {
        const lastInsertFee = await Fee.find({}).sort({ _id: -1 }).limit(1);
        const lastInsertIDFee = lastInsertFee[0]._id;
        const filterActual = { _id: lastInsertIDFee };
        const updateActual = { isActive: true };
        await Fee.findOneAndUpdate(filterActual, updateActual);
      }
    }
  }
};

//Listado de las cuotas de cada venta
export const getFees = async (req, res) => {
  let body = req.body;
  const { saleId } = body;

  if (saleId === "") {
    try {
      const fees = await Fee.find();
      res.json(fees);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else if (saleId !== "") {
    try {
      const fees = await Fee.find({ sale: saleId });
      res.json(fees);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
