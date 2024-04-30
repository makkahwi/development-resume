import axios from "axios";

const formsApi = axios.create({
  baseURL:
    "https://myresume-6ab68-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendContacts = (data: object) =>
  formsApi.post("net-website-contact-forms.json", data);
