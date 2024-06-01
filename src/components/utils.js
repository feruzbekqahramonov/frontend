async function getToken() {
    const resp = await fetch(import.meta.env.VITE_API_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          import.meta.env.VITE_CLIENT_ID + ":" + import.meta.env.VITE_SECRET_KEY
        )}`,
      },
      body: "grant_type=client_credentials",
    });
    const auth = await resp.json();

    const expireDate = getOneHourLater();
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("token", auth.access_token);
  }
  
  function getOneHourLater() {
    let currentDate = new Date();
    let oneHourLater = new Date(currentDate.getTime() + 3600); 
    let day = String(oneHourLater.getDate()).padStart(2, "0");
    let month = String(oneHourLater.getMonth() + 1).padStart(2, "0");
    let year = oneHourLater.getFullYear();
    let hours = String(oneHourLater.getHours()).padStart(2, "0");
    let minutes = String(oneHourLater.getMinutes()).padStart(2, "0");
    let formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDateTime;
  }
  
  async function checkAndUpdateToken() {
    const expireDate = localStorage.getItem("expireDate");
    const token = localStorage.getItem("token");
  
    if (!expireDate || !token || new Date() > new Date(expireDate)) {
      await getToken();
    }
  }
  
  export { getToken, checkAndUpdateToken };