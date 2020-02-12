import surveys from "./surveys";
import axios from "axios";

const getSignedUrl = async function(
  survey_id,
  fileName,
  action,
  config = null
) {
  let signedUrl;
  try {
    signedUrl = await surveys.get(
      `/audio-files/${action}/${survey_id}/${fileName}`,
      config
    );
  } catch (err) {
    throw new Error(err);
  }
  return signedUrl;
};
const putFileToBucket = async function(signedUrl, file) {
  try {
    axios.put(signedUrl, file);
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
const actionAllFilesToBucket = async function(
  survey_id,
  filesToGetSignedUrl,
  action,
  config
) {
  const response = await Promise.all(
    filesToGetSignedUrl.map(async file => {
      let response;
      try {
        response = await getSignedUrl(survey_id, file.name, action, config);
      } catch (err) {
        console.error(err);
        console.log("try to upload file on no access survey");
        throw new Error(err);
      }

      const signedUrl = response.data.signedUrl;
      if (action === "upload" && file.file) {
        putFileToBucket(signedUrl, file.file);
      }
      if (action === "download") {
        return { ...file, url: signedUrl };
      }
    })
  );

  return response;
};

export const uploadFiles = async (
  survey_id,
  questionRef,
  questionFiles,
  config
) => {
  const action = "upload";
  const filesToUpload = questionFiles.concat(questionRef);
  try {
    await actionAllFilesToBucket(survey_id, filesToUpload, action, config);
  } catch (err) {
    throw new Error(err);
  }
};
export const downloadFiles = async (survey_id, questionRef, questionFiles) => {
  const filesToDownload = questionFiles.concat({ name: questionRef });
  const action = "download";
  try {
    const response = await actionAllFilesToBucket(
      survey_id,
      filesToDownload,
      action
    );
    questionRef = response[response.length - 1];
    questionFiles = response.slice(0, response.length - 1);
  } catch (err) {
    throw new Error(err);
  }
  return { questionRef, questionFiles };
};
