const twilio = require("twilio");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

exports.messageCreate = async (req, res) => {
  const { mobileNo, id } = req.body;
  const billLink = `http://localhost:3000/bills/${id}`;

  client.messages
    .create({
      body: `Thanks for shopping!!
      Here is your bill: ${billLink}`,
      from: process.env.SEKNUM,
      to: `+91${mobileNo}`,
    })
    .then(() => {
      res.status(200).send("Bill link sent successfully!");
    })
    .catch((err) => {
      console.error("Error sending SMS:", err);
      res.status(500).send("Failed to send bill link");
    });
};

// const twilio = require("twilio");

// const accountSid = process.env.ACCOUNTSID;
// const authToken = process.env.AUTHTOKEN;
// const client = twilio(accountSid, authToken);

// exports.messageCreate = async (req, res) => {
//   try {
//     const { excelData } = req.body;

//     await Promise.all(
//       excelData.map((number, index) => {
//         return client.messages.create({
//           body: `Thanks for Voting!!`,
//           from: "process.env.SEKNUM",
//           to: `+91${number.MOBILE}`,
//         });
//       })
//     );

//     res.status(200).send("Bill link sent successfully!");
//   } catch (err) {
//     console.error("Error sending SMS:", err);
//     res.status(500).send("Failed to send bill link");
//   }
// };
