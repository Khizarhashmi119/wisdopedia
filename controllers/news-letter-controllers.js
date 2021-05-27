import { validationResult } from "express-validator";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

// @route  POST /api/v1/news-letter/subscribe
// @desc   Subscribe news letter.
// @access public
const subscribeNewsLetter = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { email } = req.body;
  const listId = process.env.LIST_ID;
  const apiKey = process.env.API_KEY;

  const subscribingUser = {
    email,
  };

  mailchimp.setConfig({
    apiKey,
    server: "us6",
  });

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
    });

    return res.status(200).json({
      msg: `Successfully added contact as an audience member. The contact's id is ${response.id}.`,
    });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  POST /api/v1/news-letter/unsubscribe
// @desc   unsubscribe news letter.
// @access public
const unsubscribeNewsLetter = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const listId = process.env.LIST_ID;
  const { email } = req.body;
  const subscriberHash = md5(email.toLowerCase());
  try {
    const response = await mailchimp.lists.updateListMember(
      listId,
      subscriberHash,
      {
        status: "unsubscribed",
      }
    );

    return res
      .status(200)
      .json({ msg: `This user is now ${response.status}.` });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

export { subscribeNewsLetter, unsubscribeNewsLetter };
