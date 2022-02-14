const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend, 

} = require ("../../controllers/userController")

router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);
router.route("/:userId/friends/:friendId").delete(deleteFriend).post(addFriend);

module.exports = router;
