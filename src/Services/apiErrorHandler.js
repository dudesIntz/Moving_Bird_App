const buildErrFromResponse = (data) =>
  new Promise((resolve, reject) => {
    let error = data.errors;
    let errorMsg = "An unknown error occured!";
    if (!error) return resolve();

    // error handler
    if (error && Array.isArray(error.msg)) {
      errorMsg = error.msg.map((val) => `${val.msg} \n`);
    } else if (error && error.msg) {
      errorMsg = `${error.msg}`;
    }
    reject({ error: errorMsg });
  });

export default buildErrFromResponse;
