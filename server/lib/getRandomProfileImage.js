const getRandomProfileImage = async () => {
  try {
    const width = 200;
    const height = 200;
    const response = await fetch(`https://picsum.photos/${width}/${height}`);

    if (response.ok) {
      const imageUrl = response.url;
      console.log(imageUrl);
      return imageUrl;
    } else {
      throw new Error('Unable to fetch a random image from Lorem Picsum.');
    }
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return null;
  }
};

module.exports = { getRandomProfileImage };
