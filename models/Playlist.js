import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    playlist: {type: String, required: true, unique: true },
    pimage: {type: String, required: true,},
    plistsongs: [{
        songname: { type: String, required: true },
        artist: { type: String, required: true },
        image: { type: String, required: true },
        audio: { type: String, required: true },
        genre: { type: String, required: true },
      }],
  }, {versionKey: false});

export default mongoose.models.Playlist || mongoose.model("Playlist", PlaylistSchema);