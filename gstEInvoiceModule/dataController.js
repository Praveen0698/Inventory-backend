const axios = require("axios");
const einvoiceModel = require("./schema");

exports.getApi = async (req, res) => {
  const url =
    "https://staging.fynamics.co.in/api/einvoice/enhanced/authentication";
  const data = {
    Username: req.body.Username,
    Password: req.body.Password,
    ForceRefreshAccessToken: false,
  };

  const headers = {
    Authorization: `Bearer ${process.env.FYN_TOKEN}`,

    Gstin: req.body.gstin,
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.genrateIRN = async (req, res) => {
  const url =
    "https://staging.fynamics.co.in/api/einvoice/enhanced/generate-irn";
  const data = req.body.formData;

  const headers = {
    Authorization: `Bearer ${process.env.FYN_TOKEN}`,

    gstin: req.body.auth.gst,
    AuthToken: req.body.auth.authToken,
    user_name: req.body.auth.Username,
    sek: req.body.auth.Sek,
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.cancelIRN = async (req, res) => {
  const data = {
    Irn: req.body.irnNumber,
    CnlRsn: "1",
    CnlRem: "Wrong entry",
  };
  const url = `https://staging.fynamics.co.in/api/einvoice/enhanced/cancel-irn`;
  const headers = {
    Authorization: `Bearer ${process.env.FYN_TOKEN}`,

    gstin: req.body.auth.gst,
    AuthToken: req.body.auth.authToken,
    user_name: req.body.auth.Username,
    sek: req.body.auth.Sek,
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.getIRN = async (req, res) => {
  console.log(req.body);

  const url = `https://staging.fynamics.co.in/api/einvoice/enhanced/get-irn/${req.body.irnNumber}`;
  const headers = {
    Authorization: `Bearer ${process.env.FYN_TOKEN}`,

    gstin: req.body.auth.gst,
    AuthToken: req.body.auth.authToken,
    user_name: req.body.auth.Username,
    sek: req.body.auth.Sek,
  };

  axios
    .get(url, { headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.saveIRN = async (req, res) => {
  try {
    const newItem = new einvoiceModel(req.body);
    await newItem.save();

    res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getIRNdata = async (req, res) => {
  await einvoiceModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};
