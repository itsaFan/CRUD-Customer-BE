const Customer = require("../model/customerModel");

const createCustomer = async (req, res) => {
  const { username, email } = req.body;

  try {
    if (!username || !email) {
      return res.status(400).json({ message: "Username or Email is required" });
    }

    const nameExist = await Customer.findOne({ name: username });
    const emailExist = await Customer.findOne({ email });
    if (nameExist || emailExist) {
      return res.status(403).json({ message: "name or email already exist" });
    }

    const newCustomer = new Customer({ name: username, email });
    await newCustomer.save();

    return res.status(201).json({ message: "success creating custome", newCustomer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (!customers) {
      return res.status(400).json({ message: "No Customers found" });
    }

    return res.status(200).json({ message: "Success getting customers", customers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCustomerById = async (req, res) => {
  const { customerId } = req.params;
  const { username, email } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const edittedCustomer = await Customer.findByIdAndUpdate({ _id: customerId }, { name: username, email });

    return res.status(200).json({ message: "Edit success", customer: edittedCustomer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const delettedCustomer = await Customer.findByIdAndDelete({_id: customerId})
    return res.status(200).json({message: 'Delete Success', customer: delettedCustomer})



  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCustomer, getAllCustomers, updateCustomerById, deleteCustomerById };
