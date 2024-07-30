import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

const listAudioFiles = async () => {
  const storageRef = ref(storage, "audio"); // Adjust the path as needed
  const audioList = await listAll(storageRef);

  const audioUrls = await Promise.all(
    audioList.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { name: itemRef.name, url };
    })
  );

  return audioUrls;
};

export { listAudioFiles };