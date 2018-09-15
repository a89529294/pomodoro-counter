const misc = {
  getObjOwnProperty: obj => {
    let arr = [];
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) {
        arr.push(x);
      }
    }
    return arr;
  },
  getCurrentDate: () => {
    const currentDate = new Date();
    const dayOfTheMonth = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const fullYear = currentDate.getFullYear();
    return `${fullYear}-${month < 10 ? "0" + month : month}-${
      dayOfTheMonth < 10 ? "0" + dayOfTheMonth : dayOfTheMonth
    }`;
  }
};

export default misc;
