import Post from "../models/Post.js";
import User from "../models/User.js";

// fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();

    res.status(201).json(user);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Delete User
export const deleteUserbyAdmin = async (req, res) => {
  // id of the user who want to delete their acccount.
  const { id, friendsIds } = req.body;

  try {
    // Delete User from Database.
    await User.findByIdAndDelete(id);
    // Remove The user from friend list of the user Friends.
    await Post.deleteMany({
      userId: id,
    });
    if (friendsIds.length > 0) {
      friendsIds.forEach(async (element) => {
        await User.updateOne({ _id: element }, { $pull: { friends: id } });
      });
    }
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const blockUserAccount = async (req, res) => {

    const {id} = req.body;

  try {
    const filter = id ;
    const update = { $set: { block: true } };
    const options = { new: true, upsert: true };

    await User.findByIdAndUpdate(filter, update, options);

    const user = await User.find();
    res.status(200).json(user);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const unBlockUserAccount = async (req, res) => {

    const {id} = req.body;

  try {
    const filter = id ;
    const update = { $set: { block: false } };
    const options = { new: true, upsert: true };

    await User.findByIdAndUpdate(filter, update, options);

    const user = await User.find();
    res.status(200).json(user);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const makeAdmin = async (req, res) => {

  const {id} = req.body;

try {
  const filter = id ;
  const update = { $set: { admin: true } };
  const options = { new: true, upsert: true };

  await User.findByIdAndUpdate(filter, update, options);

  const user = await User.find();
  res.status(200).json(user);

} catch (error) {
  res.status(404).json({ message: error.message });
}
};


export const removeAdmin = async (req, res) => {

  const {id} = req.body;

try {
  const filter = id ;
  const update = { $set: { admin: false } };
  const options = { new: true, upsert: true };

  await User.findByIdAndUpdate(filter, update, options);

  const user = await User.find();
  res.status(200).json(user);

} catch (error) {
  res.status(404).json({ message: error.message });
}
};
