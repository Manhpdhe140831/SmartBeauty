const matchAuth = async (
  email: string,
  password: string
): Promise<{ accessToken: string }> => {
  const token = await new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@sys.com") {
        // {
        //   "sub": 1,
        //   "id": 1,
        //   "name": "admin system",
        //   "email": "admin@sys.com",
        //   "role": "admin",
        //   "dateOfBirth": "2022-10-24T14:14:55.823Z",
        //   "gender": "male",
        //   "avatar": "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
        //   "mobile": "024 770 0067",
        //   "iat": 1516239022
        // }
        resolve(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJuYW1lIjoiYWRtaW4gc3lzdGVtIiwiZW1haWwiOiJhZG1pbkBzeXMuY29tIiwicm9sZSI6ImFkbWluIiwiZGF0ZU9mQmlydGgiOiIyMDIyLTEwLTI0VDE0OjE0OjU1LjgyM1oiLCJnZW5kZXIiOiJtYWxlIiwiYXZhdGFyIjoiaHR0cDovL2R1bW15aW1hZ2UuY29tLzIzMHgxMDAucG5nLzVmYTJkZC9mZmZmZmYiLCJtb2JpbGUiOiIwMjQgNzcwIDAwNjciLCJpYXQiOjE1MTYyMzkwMjJ9.kNrwOJ5pM1M_8zqbUoxVHghVp140OgpN94LL8md4XBY"
        );
        return;
      } else if (email === "manager@sys.com") {
        // {
        //   "sub": 2,
        //   "id": 2,
        //   "name": "manager branch",
        //   "email": "manager@sys.com",
        //   "role": "manager",
        //   "dateOfBirth": "2022-10-24T14:14:55.823Z",
        //   "gender": "male",
        //   "avatar": "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
        //   "mobile": "024 770 0067",
        //   "iat": 1516239022
        // }
        resolve(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlkIjoyLCJuYW1lIjoibWFuYWdlciBicmFuY2giLCJlbWFpbCI6Im1hbmFnZXJAc3lzLmNvbSIsInJvbGUiOiJtYW5hZ2VyIiwiZGF0ZU9mQmlydGgiOiIyMDIyLTEwLTI0VDE0OjE0OjU1LjgyM1oiLCJnZW5kZXIiOiJtYWxlIiwiYXZhdGFyIjoiaHR0cDovL2R1bW15aW1hZ2UuY29tLzIzMHgxMDAucG5nLzVmYTJkZC9mZmZmZmYiLCJtb2JpbGUiOiIwMjQgNzcwIDAwNjciLCJpYXQiOjE1MTYyMzkwMjJ9.6PFwRKNQAwEuRQszxcBPD9wFuf71iIMYRlx0BRtL7Vc"
        );
        return;
      } else if (email === "employee@sys.com") {
        // {
        //   "sub": 3,
        //   "id": 3,
        //   "name": "employee branch",
        //   "email": "employee@sys.com",
        //   "role": "employee",
        //   "dateOfBirth": "2022-10-24T14:14:55.823Z",
        //   "gender": "male",
        //   "avatar": "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
        //   "mobile": "024 770 0067",
        //   "iat": 1516239022
        // }
        resolve(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlkIjozLCJuYW1lIjoiZW1wbG95ZWUgYnJhbmNoIiwiZW1haWwiOiJlbXBsb3llZUBzeXMuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiZGF0ZU9mQmlydGgiOiIyMDIyLTEwLTI0VDE0OjE0OjU1LjgyM1oiLCJnZW5kZXIiOiJtYWxlIiwiYXZhdGFyIjoiaHR0cDovL2R1bW15aW1hZ2UuY29tLzIzMHgxMDAucG5nLzVmYTJkZC9mZmZmZmYiLCJtb2JpbGUiOiIwMjQgNzcwIDAwNjciLCJpYXQiOjE1MTYyMzkwMjJ9._ZvsDw2zZaDQdb1_LA-3IV7jx8cr-0FVhMRhOoxJq3A"
        );
        return;
      }
      reject({
        status: 401,
        message: "Invalid credentials",
      });
      return;
    }, 200);
  });
  return {
    accessToken: token,
  };
};

export default matchAuth;
