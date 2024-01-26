async function makeFetchRequest(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'An unknown error occurred');
  }

  return data;
}

export const verifyCode = async (userCode) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCode),
  };

  const data = await makeFetchRequest("/api/verify_code", options);
  return data.data.verified;
};

export const uploadImageImgurPost = async (imgFormData) => {
  try {
    const res = await fetch("/api/upload_to_imgur", {
      method: "POST",
      body: imgFormData,
    });
    const resMessage = await res.json();
    if (res.ok) {
      return resMessage;
    } else {
      throw new Error(resMessage.error);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendEmailPost = async (data) => {
  try {
    const res = await fetch("/api/send_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resMessage = await res.json();
    if (res.ok) {
      return resMessage.data.message;
    } else {
      throw new Error(resMessage.error);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
