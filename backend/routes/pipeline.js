const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const { domain } = req.body;

  res.json({
    success: true,
    domain,
    companies: [
      "anthropic.com",
      "cohere.com",
      "perplexity.ai"
    ],
    contacts: [
      {
        name: "Dario Amodei",
        role: "CEO"
      },
      {
        name: "Aidan Gomez",
        role: "CEO"
      }
    ],
    emails: [
      "dario@anthropic.com",
      "aidan@cohere.com"
    ]
  });
});

module.exports = router;