import dbClient from "../utils/db.js";
import sha1 from "sha1";

export const postNew = async (req, res) => {
  const email = req.body["email"];
  const password = req.body["password"];
  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Missing password" });
  }
  try {
    const emailExist = await dbClient.db
      .collection("users")
      .findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "Already exist" });
    } else {
      const hashed_pwd = sha1(password);
      const newUser = await dbClient.db
        .collection("users")
        .insertOne({ email: email, password: hashed_pwd });

      return res.status(201).json({ _id: newUser.insertedId, email });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
