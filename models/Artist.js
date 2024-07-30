import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
    artist: {type: String, required: true, unique: true },
    Desc: {type: String, required: true,},
    artistimg: {type: String, required: true,},
    Alistsongs: [{
        songname: { type: String, required: true },
        artist: { type: String, required: true },
        image: { type: String, required: true },
        audio: { type: String, required: true },
        genre: { type: String, required: true },
      }],
  }, {versionKey: false});

export default mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);