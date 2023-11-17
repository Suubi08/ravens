import mongoose from 'mongoose'; 

const ravenSchema = new mongoose.Schema({
   text: { type: String, required: true },
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
   },
   createdAt: {
    type: Date,
    default: Date.now
   },
   parentId: {
    type: String
   },
   children: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Raven'
    }
   ]
});

const Raven = mongoose.models.Raven || mongoose.model('Raven', ravenSchema);

export default Raven;