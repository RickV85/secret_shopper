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
    return error;
  }
};
