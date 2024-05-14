import Publications from './publications.model.js';

export const getPublications = async (req, res) => {
  try {
    const publications = await Publications.find();
    res.status(200).json({ publications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching publications' });
  }
};

export const createPublication = async (req, res) => {
  try {
    const { title, category, text } = req.body;
    const newPublication = new Publications({ title, category, text });
    await newPublication.save();
    res.status(201).json({ message: 'Publication created successfully', publication: newPublication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating publication' });
  }
};

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, text } = req.body;
    const updatedPublication = await Publications.findByIdAndUpdate(id, { title, category, text }, { new: true });
    if (!updatedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json({ message: 'Publication updated successfully', publication: updatedPublication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating publication' });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPublication = await Publications.findByIdAndDelete(id);
    if (!deletedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting publication' });
  }
};
