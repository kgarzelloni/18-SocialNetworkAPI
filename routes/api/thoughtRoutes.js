const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction, 

} = require ("../../controllers/thoughtController")

router.route("/").get(getAllThoughts).post(createNewThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction).post(addReaction);

module.exports = router;