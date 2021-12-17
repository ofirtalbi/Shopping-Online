
export class UserModel {
    public constructor(
        public _id?: string,
        public email?: string,
        public password?: string,
        public city?: string,
        public street?: string,
        public name?: string,
        public lastName?: string,
        public role: string = "user",
        public cart?: []
    ) { }
}