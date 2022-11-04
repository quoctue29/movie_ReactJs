let USER = "UserInfor";

export const localService = {
  saveToStorage: (data) => {
    let dataJson = JSON.stringify(data);
    localStorage.setItem(USER, dataJson);
  },
  getUserInfor: () => {
    let dataJson = localStorage.getItem(USER);
    if (dataJson) {
      return JSON.parse(dataJson);
    } else {
      return null;
    }
  },
  removeUserInfor: () => {
    localStorage.removeItem(USER);
  },
};
