import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    songname: { type: String, required: true, unique: true },
    artist: { type: String, required: true },
    image: { type: String, required: true },
    audio: { type: String, required: true },
    genre: { type: String, required: true },
}, { versionKey: false });

export default mongoose.models.Song || mongoose.model("Song", SongSchema);
