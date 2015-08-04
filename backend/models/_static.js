// Example static models
// Remove '_' from file name to use this

exports.users = [
    {username: "username", password: "password"}
];

exports.files = [
    {name: "Visible file name", filename: "file name in frontend/app/assets/files folder"}
];

exports.links = [
    {name: "Visible link text", url: "url"}
];

exports.projects = [
    {
        name: "",
        time: "",
        type: "",
        description: "",
        tags: ["tag1", "tag2"],
        link: {name: "Visible link text", url: "url"},
        images: ["image_name"]
    }
];