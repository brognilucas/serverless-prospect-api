import jwt from "jsonwebtoken";

interface JWTPayload {
  username: string;
  userType: string;
}

interface AWSAuth {
  Action: string;
  Effect: string;
  Resource: string;
}

export interface LambdaAuth {
  principalId: string;

  policyDocument: {
    Version: string;
    Statement: AWSAuth[];
  };
}

interface RequestContext {
  httpMethod: "POST";
  resourcePath: "/prospects";
}

export class Authorization {
  static async generateToken(payload: JWTPayload): Promise<string> {
    const token: string = await jwt.sign(payload, process.env.JWT_SECRET);

    return token;
  }

  static requiresAdministrator(requestContext: RequestContext): boolean {
    return (
      ["PUT", "POST", "DELETE"].includes(requestContext.httpMethod) &&
      !requestContext.resourcePath.includes("evaluations")
    );
  }

  static async validateToken({
    authorizationToken,
    requestContext,
  }: {
    authorizationToken: string;
    requestContext: RequestContext;
  }): Promise<LambdaAuth> {
    if (!authorizationToken) {
      throw "Token not informed";
    }

    const bearerToken = authorizationToken.split(" ");
    if (bearerToken[0] !== "Bearer" || !bearerToken[1]) {
      throw "Malformed token";
    }

    const token = bearerToken[1];

    const decoded: JWTPayload = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as JWTPayload;

    const effectAdministratorUsage =
      decoded.userType === "administrator" ? "Allow" : "Deny";

    const effect = Authorization.requiresAdministrator(requestContext)
      ? effectAdministratorUsage
      : "Allow";

    return {
      principalId: decoded.username,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource: "*",
          },
        ],
      },
    };
  }
}
