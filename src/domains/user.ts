
export class User {
    email: string;
    password: string;

    constructor() {
    }

    public static fromJson(obj: Object) {
        let result: User = new User();
        result.email = obj["email"];
        result.password = obj["password"];
        return result;
    }

    public toJsonString() {
        return JSON.stringify(this);
    }

    public toJsonObject() {
        return JSON.parse(this.toJsonString());
    }
}
  