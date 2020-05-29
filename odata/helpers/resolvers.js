exports.GetQuery = async (url, Database) => {
    try {
        if(Database === 'mssql'){

        }
        else if(Database === 'pg'){

        }
    } catch (err) {
      return (result = {
        message: "Couldn't create query",
        error: err.originalError
      });
    }
  };

  exports.GetMSsqlQuery = async (url, Database) => {
    try {
     return "abcd"
    } catch (err) {
      return (result = {
        message: "Couldn't create query",
        error: err.originalError
      });
    }
  };

  exports.GetMysqlQuery = async (url, Database) => {
    try {
      return "abcd"
    } catch (err) {
      return (result = {
        message: "Couldn't create query",
        error: err.originalError
      });
    }
  };

  exports.GetpgQuery = async (url, Database) => {
    try {
      return "abcd"
    } catch (err) {
      return (result = {
        message: "Couldn't create query",
        error: err.originalError
      });
    }
  };

  exports.Getdb2Query = async (url, Database) => {
    try {
      return "abcd"
    } catch (err) {
      return (result = {
        message: "Couldn't create query",
        error: err.originalError
      });
    }
  };