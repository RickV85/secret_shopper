export const verifyCode = async (userCode) => {
  try {
    const res = await fetch("/api/verify_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCode),
    });

    if (res.ok) {
      const resMessage = await res.json();
      return resMessage.data.verified;
    } else {
      throw new Error(res);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
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
      throw new Error(resMessage);
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
      return resMessage;
    } else {
      throw new Error(resMessage);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
