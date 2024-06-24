const axios = require('axios');
const moment = require("moment");

const webhookURL = process.env.WEBHOOK;

async function post(appInfo, submissionStartDate) {
  const axiosInstance = axios.create({
    baseURL: 'https://hook.swit.io',
    headers: {
      'Content-type': 'application/json',
    },
  });
  
  const textDataObject = {
    'Title': '',
    'Desc': '',
    'URL': '',
    'Elapsed': '',
  };

  textDataObject['Title'] = `App Store Connect`;
  textDataObject['Desc'] = `The status of your app ${appInfo.name} has been changed to ${appInfo.status}(v${appInfo.version})`;
  textDataObject['URL'] = `https://appstoreconnect.apple.com/apps/${appInfo.appID}/appstore`;
  
  // Set elapsed time since "Waiting For Review" start
  if (
    submissionStartDate &&
    appInfo.status != "Prepare for Submission" &&
    appInfo.status != "Waiting For Review"
  ) {
    const elapsedHours = moment().diff(moment(submissionStartDate), "hours");
    textDataObject['Elapsed'] = `Elapsed Time: ${elapsedHours} hours`;
  }
  
  await axiosInstance.post('/chat/24052404531747XPMJO3/TZO3Xjvv9dwVHEf2IxIr?organization_id=19090600325683321', {
    text: createTextBox(textDataObject),
  });
}

module.exports = {
  post: post,
};
