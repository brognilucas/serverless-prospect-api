import jwt from "jsonwebtoken";

interface JWTPayload {
  username: string;
  userType: string;
}

interface LambdaAuth {
  principalId: string;

  policyDocument: {
    Version: "2012-10-17";
    Statement: [
      {
        Action: "execute-api:Invoke";
        Effect: "Allow";
        Resource: "*";
      }
    ];
  };
}

export class Authorization {
  static async generateToken(payload: JWTPayload): Promise<string> {
    const token: string = await jwt.sign(payload, process.env.JWT_SECRET);

    return token;
  }

  static async validateToken({
    authorizationToken,
  }: {
    authorizationToken: string;
  }): Promise<LambdaAuth> {
    const bearerToken = authorizationToken.split(" ");

    if (bearerToken[0] !== "Bearer" || !bearerToken[1]) {
      throw "Malformed token";
    }

    const token = bearerToken[1];

    const decoded: JWTPayload = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as JWTPayload;

    return {
      principalId: decoded.username,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  }
}
