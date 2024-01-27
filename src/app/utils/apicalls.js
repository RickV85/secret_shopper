async function makeFetchRequest(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || "An unknown error occurred");
  }

  return data;
}

export const verifyCode = async (userCode) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCode),
  };

  const verifyRes = await makeFetchRequest("/api/verify_code", options);
  return verifyRes.data.verified;
};

export const uploadImageImgurPost = async (imgFormData) => {
  const options = { method: "POST", body: imgFormData };
  const imgurRes = await makeFetchRequest("/api/upload_to_imgur", options);
  return imgurRes.data;
};

export const sendEmailPost = async (submittedData) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submittedData),
  };

  const sendEmailRes = await makeFetchRequest("/api/send_email", options);
  return sendEmailRes.data.message;
};
