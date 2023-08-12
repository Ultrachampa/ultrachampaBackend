import User from "../models/Users";
import Fee from "../models/Fee";
import Sale from "../models/Sale";

export const documentCount = async (req, res) => {
  try {
    const femaleCount = await User.countDocuments({ gender: "femenino" });
    const maleCount = await User.countDocuments({ gender: "masculino" });
    const totalEarns = await Fee.aggregate([
      {
        $group: {
          _id: { isPayed: "$isPayed" },
          total: {
            $sum: "$feePrice",
          },
        },
      },
    ]);

    const countRaces = await Sale.aggregate([
      {
        $group: {
          _id: { race: "$race", name: "$name" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    var data = {
      femaleUserCount: femaleCount,
      maleUserCount: maleCount,
      totalEarns: totalEarns,
      countRaces: countRaces,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
