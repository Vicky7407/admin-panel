export const Getdata = () => (dispatch) =>{
    try{
         fetch(baseUrl + 'medicines')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
        error => {
          var errmess = new Error(error.message);
          throw errmess;
        })
      .then(response => response.json())
      .then(medicines => dispatch(({ type: ActionTypes.MEDICINES_RETRIEVED, payload: medicines })))
      .catch(error => dispatch(medicinesFailed(error.message)));
    }

  }