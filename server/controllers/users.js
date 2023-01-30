import User from "../models/User.js";
import bcrypt from "bcrypt";
import Post from "../models/Post.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const searchUser = async (req, res) => {
  let search = new RegExp("^"+req.body.searchUser,"i");
  if(search !== "" ){
    try {
      const users = await User.find({userName : search})
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: err.message });
    } 
  }
}


export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, userName,location, picturePath, twitter, linkedin }) => {
        return { _id, firstName, userName ,lastName, occupation, location, picturePath, twitter, linkedin };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, userName,location, picturePath }) => {
        return { _id, firstName, lastName, userName,occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });

  }
};


// Update User Personal Information 
export const updatePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName, lastName, location, occupation, twitter, linkedin
    } = req.body;

    const updatedUser = await User.findOneAndUpdate({ _id: id }, { firstName, lastName, location, occupation, twitter, linkedin }, {
      new: true,
      upsert: true,
      rawResult: true
    });

    console.log(updatedUser)
    res.status(200).json({ updatedUser })

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Delete User
export const deleteUser = async (req, res) => {
  // id of the user who want to delete their acccount.
  const { id } = req.params;
  const { password, friendsIds } = req.body

  try {
    const user = await User.findById(id);
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Delete User from Database.
      await User.findByIdAndDelete(id)
      // Remove The user from friend list of the user Friends.
      await Post.deleteMany({
        userId: id
      })
      if (friendsIds.length > 0) {
        friendsIds.forEach(async (element) => {
          await User.updateOne({ _id: element }, { $pull: { friends: id } })
        });
      }

      res.status(200).json({ msg: "Successfully deleted the user" });
    }
    // if the password is incorrect 
    else {
      return res.status(401).json({ msg: "Invalid Password." });
    }



  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}