const User = require('../models/user.js');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params; 
  const { email } = req.body;

  console.log('Updating user with ID:', id); 
  console.log('Request body:', req.body);

  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, { email }, { new: true });
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
  }
};
