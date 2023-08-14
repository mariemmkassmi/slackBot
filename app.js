const { App } = require('@slack/bolt');
require('dotenv').config();
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});
app.command('/schedule_reminders', async ({ command, ack, say }) => {
  await ack();
  const now = new Date();
  const nineAM = new Date(now);
  nineAM.setHours(9, 0, 0, 0);

  const fourPM = new Date(now);
  fourPM.setHours(16, 0, 0, 0);
  const channelId = 'C05LF1MLTL0';
  scheduleReminder(
    nineAM,
    'Reminder: @channel Pensez à votre reporting du matin (coche_trait_plein = c\'est fait, ou :x: = pas encore, ou :interdit: = pas besoin, sur ce message)',
    channelId
  );
  scheduleReminder(
    fourPM,
    'Reminder: @channel Pensez à votre reporting de l\'après-midi (coche_trait_plein = c\'est fait, ou :x: = pas encore, ou :interdit: = pas besoin, sur ce message)',
    channelId
  );

  say('Reminders scheduled successfully!');
});
app.command("/square", async ({ command, ack, say }) => {
  try {
    await ack();
    let txt = command.text; 
    if (isNaN(txt)) {
      say(txt + " is not a number");
    } else {
      say(txt + " squared = " + (parseFloat(txt) * parseFloat(txt)));
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
});
app.message("hello", async ({ command, say }) => { 
  try {
    say("Hi! Thanks for PM'ing me!");
  } catch (error) {
    console.error(error);
  }
});
app.command("/hello", async ({ command, ack, say }) => {
  try {
    await ack(); 
    say(`Hello, <@${command.user_id}>! How can I assist you?`);
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
