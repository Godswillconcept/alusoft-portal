const Payment = require("../models/Payment");
const Student = require("../models/Student");
const Programme = require("../models/Programme");

const getAllPayments = async (req, res) => {
  const payments = await Payment.findAll();
  try {
    res.json({
      status: "success",
      message: "All payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "All payments retrieved failed",
      data: error,
    });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params; // payment id
  const payment = await Payment.findById(id);
  try {
    res.json({
      status: "success",
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Payment retrieved failed",
      data: error,
    });
  }
};

const getPaymentByStudent = async (req, res) => {
  const { student_id } = req.params; // student id
  const payments = await Payment.findPaymentByStudent(student_id);
  try {
    res.json({
      status: "success",
      message: "Payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Payments retrieved failed",
      data: error,
    });
  }
};

const createPayment = async (req, res) => {
  const { student_id, programme_id, amount, payment_date, payment_method } =
    req.body;
  let payment = new Payment(
    student_id,
    programme_id,
    amount,
    payment_date,
    payment_method
  );
  try {
    payment = await payment.create();
    res.json({
      status: "success",
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Payment created failed",
      data: error,
    });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { student_id, programme_id, amount, payment_date, payment_method } =
    req.body;
  let payment = await Payment.findById(id);
  payment.student_id = student_id || payment.student_id;
  payment.programme_id = programme_id || payment.programme_id;
  payment.amount = amount || payment.amount;
  payment.payment_date = payment_date || payment.payment_date;
  payment.payment_method = payment_method || payment.payment_method;
  try {
    payment = await payment.update();
    res.json({
      status: "success",
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Payment updated failed",
      data: error,
    });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params; // payment id
  const payment = await Payment.findById(id);
  try {
    await payment.delete();
    res.json({
      status: "success",
      message: "Payment deleted successfully",
      data: payment,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Payment deleted failed",
      data: error,
    });
  }
};




module.exports = {
  getAllPayments,
  getPaymentById,
  getPaymentByStudent,
  createPayment,
  updatePayment,
  deletePayment,
};
