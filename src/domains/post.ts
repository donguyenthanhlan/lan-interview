
export class Post {
    id: number;
    date: Date;
    slug: string;
    status: string;
    link: string; 

    public static fromJson(obj: Object) {
        let result: Post = new Post();
        result.id = obj["id"];
        result.date = obj["date"];
        result.link = obj["link"];
        result.slug = obj["slug"];
        result.status = obj["status"];
        return result;
    }

    public toJsonString() {
        return JSON.stringify(this);
    }

    public toJsonObject() {
        return JSON.parse(this.toJsonString());
    }
}
  