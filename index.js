 let timestamp = ((Date.now() / 1000) | 0).toString();
    let api_key = cloudINFO.api_key;
    let cloud = cloudINFO.cloudname;
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload';

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      console.log({ xhr });
    };
    let formdata = new FormData();
    formdata.append('file', {
      // @ts-ignore
      uri: uploadURL,
      type: 'image/png',
      name: 'upload.png',
    });
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('upload_preset', cloudINFO.upload_preset.content_store);
    // xhr.send(formdata);

    toggleLoader();

    Axios({
      method: 'post',
      url: upload_url,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        //handle success
        sendStateToParent(response.data.secure_url);
        alert('Image Uploaded!');
        toggleLoader();
        toggleModal();
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        toggleLoader();
        alert('Failed to Upload');
      });
  }
